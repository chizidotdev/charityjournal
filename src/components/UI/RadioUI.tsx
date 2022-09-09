import { RadioGroup, Stack, Radio } from '@chakra-ui/react';

interface RadioProps {
  options: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function RadioUI({ options, value, setValue }: RadioProps) {
  console.log(options);

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction='row'>
        {/* {options.map((option, idx) => (
            <Radio key={idx} value='1'>First</Radio>
        ))} */}
        <Radio value='1'>First</Radio>
        <Radio value='1'>First</Radio>
        <Radio value='1'>First</Radio>
      </Stack>
    </RadioGroup>
  );
}

export default RadioUI;
