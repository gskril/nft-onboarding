// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

// ----------------------------------------------------------------------------
// BokkyPooBah's DateTime Library v1.01
//
// A gas-efficient Solidity date and time library
//
// https://github.com/bokkypoobah/BokkyPooBahsDateTimeLibrary
//
// Tested date range 1970/01/01 to 2345/12/31
//
// Conventions:
// Unit      | Range         | Notes
// :-------- |:-------------:|:-----
// timestamp | >= 0          | Unix timestamp, number of seconds since 1970/01/01 00:00:00 UTC
// year      | 1970 ... 2345 |
// month     | 1 ... 12      |
// day       | 1 ... 31      |
// hour      | 0 ... 23      |
// minute    | 0 ... 59      |
// second    | 0 ... 59      |
// dayOfWeek | 1 ... 7       | 1 = Monday, ..., 7 = Sunday
//
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018-2019. The MIT Licence.
// ----------------------------------------------------------------------------

import "@openzeppelin/contracts/utils/Strings.sol";

library BokkyPooBahsDateTimeLibrary {

    uint constant SECONDS_PER_DAY = 24 * 60 * 60;
    uint constant SECONDS_PER_HOUR = 60 * 60;
    uint constant SECONDS_PER_MINUTE = 60;
    int constant OFFSET19700101 = 2440588;

    // ------------------------------------------------------------------------
    // Calculate year/month/day from the number of days since 1970/01/01 using
    // the date conversion algorithm from
    //   http://aa.usno.navy.mil/faq/docs/JD_Formula.php
    // and adding the offset 2440588 so that 1970/01/01 is day 0
    //
    // int L = days + 68569 + offset
    // int N = 4 * L / 146097
    // L = L - (146097 * N + 3) / 4
    // year = 4000 * (L + 1) / 1461001
    // L = L - 1461 * year / 4 + 31
    // month = 80 * L / 2447
    // dd = L - 2447 * month / 80
    // L = month / 11
    // month = month + 2 - 12 * L
    // year = 100 * (N - 49) + year + L
    // ------------------------------------------------------------------------
    function _daysToDate(uint _days) internal pure returns (uint year, uint month, uint day) {
        int __days = int(_days);

        int L = __days + 68569 + OFFSET19700101;
        int N = 4 * L / 146097;
        L = L - (146097 * N + 3) / 4;
        int _year = 4000 * (L + 1) / 1461001;
        L = L - 1461 * _year / 4 + 31;
        int _month = 80 * L / 2447;
        int _day = L - 2447 * _month / 80;
        L = _month / 11;
        _month = _month + 2 - 12 * L;
        _year = 100 * (N - 49) + _year + L;

        year = uint(_year);
        month = uint(_month);
        day = uint(_day);
    }

    function getYear(uint timestamp) internal pure returns (uint year) {
        (year,,) = _daysToDate(timestamp / SECONDS_PER_DAY);
    }

    function getMonth(uint timestamp) internal pure returns (uint month) {
        (,month,) = _daysToDate(timestamp / SECONDS_PER_DAY);
    }

    // Added to original library
    function getMonthStr(uint timestamp) internal pure returns (string memory monthStr) {
        uint _month = getMonth(timestamp);

        if (_month == 1) {
            monthStr = "Jan";
        } else if (_month == 2) {
            monthStr = "Feb";
        } else if (_month == 3) {
            monthStr = "Mar";
        } else if (_month == 4) {
            monthStr = "Apr";
        } else if (_month == 5) {
            monthStr = "May";
        } else if (_month == 6) {
            monthStr = "Jun";
        } else if (_month == 7) {
            monthStr = "Jul";
        } else if (_month == 8) {
            monthStr = "Aug";
        } else if (_month == 9) {
            monthStr = "Sep";
        } else if (_month == 10) {
            monthStr = "Oct";
        } else if (_month == 11) {
            monthStr = "Nov";
        } else if (_month == 12) {
            monthStr = "Dec";
        }
    }

    function getDay(uint timestamp) internal pure returns (uint day) {
        (,,day) = _daysToDate(timestamp / SECONDS_PER_DAY);
    }

    function getHour(uint timestamp) internal pure returns (string memory) {
        uint secs = timestamp % SECONDS_PER_DAY;
        uint hour = secs / SECONDS_PER_HOUR;

        if (hour < 10) {
            return string(abi.encodePacked("0", Strings.toString(hour)));
        } else {
            return string(Strings.toString(hour));
        }
    }

    function getMinute(uint timestamp) internal pure returns (string memory) {
        uint secs = timestamp % SECONDS_PER_HOUR;
        uint minute = secs / SECONDS_PER_MINUTE;

        if (minute < 10) {
            return string(abi.encodePacked("0", Strings.toString(minute)));
        } else {
            return string(Strings.toString(minute));
        }
    }
    
    function getSecond(uint timestamp) internal pure returns (string memory) {
        uint second = timestamp % SECONDS_PER_MINUTE;

        if (second < 10) {
            return string(abi.encodePacked("0", Strings.toString(second)));
        } else {
            return string(Strings.toString(second));
        }
    }

    function getDateTime(uint timestamp) public pure returns (string memory) {
        return string(
            abi.encodePacked(
                getMonthStr(timestamp), " ",
                Strings.toString(getDay(timestamp)), ", ",
                Strings.toString(getYear(timestamp)), "  \xE2\x80\xA2  ",
                getHour(timestamp), ":",
                getMinute(timestamp), ":",
                getSecond(timestamp), " GMT"
            )
        );
    }
}