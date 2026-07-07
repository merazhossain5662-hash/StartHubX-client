"use client";

import {
  Calendar,
  DateField,
  DatePicker,
  FieldError,
  Label,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";

export function Date() {
  const currentDate = today(getLocalTimeZone());

  return (
    <>
      <div className="bg-transparent backdrop-blur-lg border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl p-3">
        <Label>Application Deadline</Label>
        <DateField.Group
          fullWidth
          className="bg-gray-900 border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-0 focus:ring-[#8dd0f2]/70 rounded-2xl p-3"
        >
          <DateField.Input className="bg-transparent border-none focus:ring-0 focus:border-none ">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger className=" bg-gray-800 p-2 text-lg  border-none focus:ring-0 focus:border-none">
              <DatePicker.TriggerIndicator className="text-[#d7f2ff]" />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <FieldError>Date must be today or in the future.</FieldError>
      </div>
      <div>
        <DatePicker.Popover className=" bg-transparent max-w-70 backdrop-blur-lg border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
          <Calendar
            aria-label="Event date"
            className="bg-transparent backdrop-blur-2xl "
          >
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.YearPickerGrid>
              <Calendar.YearPickerGridBody>
                {({ year }) => <Calendar.YearPickerCell year={year} />}
              </Calendar.YearPickerGridBody>
            </Calendar.YearPickerGrid>
          </Calendar>
        </DatePicker.Popover>
      </div>
    </>
  );
}
