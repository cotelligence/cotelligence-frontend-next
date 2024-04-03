import { Input, Select, SelectItem } from '@nextui-org/react';
import { createParser } from 'eventsource-parser';
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { predictByUuid, PredictInput } from '@/lib/apis/predicte-by-uuid';
import { MODEL_BACKEDN_URL } from '@/lib/constants';
import { checkFetchResponse } from '@/lib/fns/check-fetch-response';
import { parseError } from '@/lib/fns/parse-error';
import { ModelType } from '@/lib/types';

import { MyButton } from '../my-button';
import { useModelInfo } from '.';
import { useOutputState } from './output-section';

const items: Array<{
  label: string;
  size: [number, number];
}> = [
  {
    label: 'Square',
    size: [1024, 1024],
  },
  {
    label: 'Landscape',
    size: [1216, 832],
  },
  {
    label: 'Portrait',
    size: [832, 1216],
  },
];

const render = (item: (typeof items)[0]) => (
  <SelectItem key={item.label}>{`${item.label} (${item.size.join(' x ')})`}</SelectItem>
);

const FormPanel = () => {
  const loading = useOutputState((state) => state.loading);

  const model = useModelInfo();

  const [id, setId] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;

      const prompt = (form.elements.namedItem('prompt') as HTMLInputElement).value.trim();

      if (!prompt) {
        toast.warn('Prompt field is required!');

        return;
      }

      const input: PredictInput = { prompt };

      if (model.type === ModelType.Text2Img) {
        const aspectKey = (form.elements.namedItem('size') as HTMLSelectElement).value;

        [input.width, input.height] = items.find(
          (item) => item.label === aspectKey,
        )!.size;
      }

      if (model.type === ModelType.Text2Text) {
        const max_new_tokens = +(
          form.elements.namedItem('max_new_tokens') as HTMLSelectElement
        ).value.trim();

        if (Number.isInteger(max_new_tokens)) {
          input.max_new_tokens = max_new_tokens;
        }
      }

      useOutputState.setState(
        {
          loading: true,
          data: null,
        },
        true,
      );

      const data = await predictByUuid(model.uuid, {
        input,
        stream: model.type === ModelType.Text2Text,
      });

      useOutputState.setState({ data });

      if (data.stream) {
        const res = await fetch(`${MODEL_BACKEDN_URL}/sse/${data.id}`);

        await checkFetchResponse(res);

        const reader = res.body?.getReader();

        if (reader) {
          const decoder = new TextDecoder();
          const parser = createParser((event) => {
            event.type === 'event' &&
              event.data &&
              useOutputState.setState({ text: event.data });
          });

          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read();

            parser.feed(decoder.decode(value, { stream: true }));
            if (done) {
              break;
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(parseError(err));
    } finally {
      useOutputState.setState({ loading: false });
    }
  };

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setId((pre) => pre + 1);
  };

  return (
    <form
      className="flex flex-col gap-3 h-full"
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <div
        key={id}
        className="grid grid-cols-1 auto-rows-max gap-3 flex-1 overflow-auto pr-9"
      >
        <Input
          classNames={{
            inputWrapper: 'border-1',
          }}
          label="Prompt"
          labelPlacement="outside"
          name="prompt"
          placeholder=" "
          radius="none"
          variant="bordered"
        />
        {model.type === ModelType.Text2Img && (
          <Select
            disallowEmptySelection
            classNames={{
              trigger: 'border-1',
              popoverContent: 'rounded-none',
              value: 'text-primary',
            }}
            defaultSelectedKeys={[items[0].label]}
            items={items}
            label="Aspect Ratio"
            labelPlacement="outside"
            name="size"
            placeholder=" "
            radius="none"
            variant="bordered"
          >
            {render}
          </Select>
        )}
        {model.type === ModelType.Text2Text && (
          <Input
            classNames={{
              inputWrapper: 'border-1',
            }}
            defaultValue="512"
            label="Max New Tokens"
            labelPlacement="outside"
            min={1}
            name="max_new_tokens"
            placeholder=" "
            radius="none"
            type="number"
            variant="bordered"
          />
        )}
      </div>
      <div className="flex gap-8 justify-end pt-5 pb-1 border-t border-divider flex-none pr-9">
        <MyButton isDisabled={loading} type="reset">
          Reset
        </MyButton>
        <MyButton isLoading={loading} type="submit">
          Submit
        </MyButton>
      </div>
    </form>
  );
};

export default FormPanel;
