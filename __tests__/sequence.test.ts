import { Sequence } from '../src';

describe('Sequence', () => {
  it('it starts counter at 0 and is incremented on call', () => {
    // Given
    const identityCallback = (nb: number) => nb;

    // When
    const sequence = new Sequence(identityCallback);

    // Then
    expect(sequence.next).toEqual(0);
    expect(sequence.next).toEqual(1);
  });

  it('it applies callback with interpolation and increments counter', () => {
    // Given
    const stringFormatterCallback = (nb: number) => `nb: ${nb}`;

    // When
    const sequence = new Sequence(stringFormatterCallback);

    // Then
    expect(sequence.next).toEqual('nb: 0');
    expect(sequence.next).toEqual('nb: 1');
  });
});
