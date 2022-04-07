/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */

import moment from 'moment';

export const Utils = {
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  WEEKDAYS: moment.weekdaysShort(),
  MONTHS: moment.months(),
  MAX_ROWS: 7,
  MAX_COLUMNS: 7,
  FIRST_DAY_OFFSETS: [0, -1, 5, 4, 3, 2, 1],
  getDaysInMonth: function (month, year) {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  },
  isSameMonthAndYear: function (date, month, year) {
    if (date) {
      return date.month() === month && date.year() === year;
    }
    return false;
  },
  // Test whether objects' values are different.
  // `exclusions` param ignores provided keys.
  // Returns array of keys that are different (empty array means identical).
  shallowDiff: function (a, b, exclusions = []) {
    const diffs = [];
    for (let key of Object.keys(a)) {
      if (exclusions.includes(key)) {
        continue;
      }
      if (a[key] !== b[key]) {
        diffs.push(key);
      }
    }
    return diffs;
  },
  // Robust compare Moment dates.
  compareDates: function (a, b, granularity) {
    // Allow for falsy (null & undefined) equality.
    if (!a && !b) {
      return true;
    }
    return !!a && !!b && a.isSame(b, granularity);
  },
  getWeekdays: function (firstDay = 0) {
    let from = firstDay;
    const weekdays = [];
    for (let i = 0; i < Utils.WEEKDAYS.length; i++) {
      weekdays.push(Utils.WEEKDAYS[from]);
      from = from >= Utils.WEEKDAYS.length - 1 ? 0 : from + 1;
    }
    return weekdays;
  },
  getISOWeekdaysOrder: function (firstDay = 0) {
    let from = firstDay === 0 ? 7 : firstDay;
    const order = [];
    for (let i = 0; i < Utils.WEEKDAYS.length; i++) {
      order.push(from);
      from = from >= Utils.WEEKDAYS.length ? 1 : from + 1;
    }
    return order;
  },
};

const defineds = {
  startOfMonth: moment().startOf('month'),
  endOfMonth: moment().endOf('month'),
  startOfLastMonth: moment().subtract(1, 'month').startOf('month'),
  endOfLastMonth: moment().subtract(1, 'month').endOf('month'),
  startOfQuarter: moment().startOf('quarter'),
  endOfQuarter: moment().endOf('quarter'),
  startOfLastQuarter: moment().subtract(1, 'quarter').startOf('quarter'),
  endOfLastQuarter: moment().subtract(1, 'quarter').endOf('quarter'),
  startOfYear: moment().startOf('year'),
  endOfYear: moment().endOf('year'),
};

const staticRangeHandler = {
  isSelected(range) {
    const definedRange = this.range();
    return (
      moment(range.firstDate).isSame(definedRange.firstDate) &&
      moment(range.secondDate).isSame(definedRange.secondDate)
    );
  },
};

export function createStaticRanges(ranges) {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
}

export const getStaticRanges = () =>
  createStaticRanges([
    {
      label: 'Tháng này',
      range: () => ({
        firstDate: defineds.startOfMonth,
        secondDate: defineds.endOfMonth,
      }),
    },
    {
      label: 'Tháng trước',
      range: () => ({
        firstDate: defineds.startOfLastMonth,
        secondDate: defineds.endOfLastMonth,
      }),
    },
    {
      label: 'Quý này',
      range: () => ({
        firstDate: defineds.startOfQuarter,
        secondDate: defineds.endOfQuarter,
      }),
    },
    {
      label: 'Quý trước',
      range: () => ({
        firstDate: defineds.startOfLastQuarter,
        secondDate: defineds.endOfLastQuarter,
      }),
    },
    {
      label: 'Năm nay',
      range: () => ({
        firstDate: defineds.startOfYear,
        secondDate: defineds.endOfYear,
      }),
    },
  ]);
