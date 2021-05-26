import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'alive' })
export class AlivePipe implements PipeTransform {
  transform(born?: string, died?: string): string {
    if (!died) {
      return 'Yes';
    }
    if (!born && died) {
      return 'Died at unknown age';
    }

    const datesRegexp = /([0-9]+) (.)C(,?([\D]*)?([0-9]+)? (.)C)?/;
    let bornMatch = born.match(datesRegexp);
    let diedMatch = died.match(datesRegexp);

    const leftBorn: number = +(
      this.signNumber(bornMatch?.[2]) + bornMatch?.[1]
    );
    const leftDied: number = +(
      this.signNumber(diedMatch?.[2]) + diedMatch?.[1]
    );
    const rightBorn: number = +(
      this.signNumber(bornMatch?.[6]) + bornMatch?.[5]
    );
    const rightDied: number = +(
      this.signNumber(diedMatch?.[6]) + diedMatch?.[5]
    );

    const ages: number[] = [
      leftDied - leftBorn,
      leftDied - rightBorn,
      rightDied - leftBorn,
      rightDied - rightBorn,
    ].filter((val) => !Number.isNaN(val));

    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    if (!Number.isNaN(leftBorn) && !Number.isNaN(leftDied)) {
      return `No, died ${
        minAge !== maxAge ? `between ${minAge} and ${maxAge}` : `at ${minAge}`
      } years old`;
    } else {
      return `No, died at unknown age`;
    }
  }

  private signNumber(input: string) {
    if (input === 'A') {
      return '+';
    }
    if (input === 'B') {
      return '-';
    }
  }
}
