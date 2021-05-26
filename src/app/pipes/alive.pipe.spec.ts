import { AlivePipe } from './alive.pipe';

fdescribe('AlivePipe', () => {
  const pipe = new AlivePipe();
  const inputsAndAns = [
    {
      input: {
        born: 'In 183 AC or 184 AC',
        died: 'In 196 AC, at Redgrass Field',
      },
      answer: 'No, died between 12 and 13 years old',
    },
    {
      input: {
        born: "107 AC, at King's Landing",
        died: "131 AC, at King's Landing",
      },
      answer: 'No, died at 24 years old',
    },
    {
      input: {
        born: 'In 115 AC or later, at Hull, Driftmark',
        died: 'In or between 171 AC and 176 AC, at sea',
      },
      answer: 'No, died between 56 and 61 years old',
    },
    {
      input: {
        born: 'In or between 191 AC and 194 AC',
        died: 'In 232 AC',
      },
      answer: 'No, died between 38 and 41 years old',
    },
    {
      input: {
        born: '27 BC, at Dragonstone',
        died: '37 AC, at Dragonstone',
      },
      answer: 'No, died at 64 years old',
    },
  ];

  it('should return Yes', () => {
    expect(pipe.transform('dsand', null)).toBe('Yes');
  });

  it('should properly calculate the age', () => {
    inputsAndAns.forEach((val) =>
      expect(pipe.transform(val.input.born, val.input.died)).toBe(val.answer)
    );
  });

  it('should return Died at uknown age', () => {
    expect(pipe.transform(null, '299 AC, at Pyke')).toBe('Died at unknown age');
  });
});
