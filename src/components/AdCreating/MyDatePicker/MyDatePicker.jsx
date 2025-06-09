import React, { memo } from 'react';
import DatePicker from "react-mobile-datepicker";
const MyDatePicker = ({
    confirmText , cancelText, theme, showCaption, dateConfig, value, isOpen, onSelect, onCancel, min
}) => {
    return (
        <DatePicker
        confirmText={confirmText}
        cancelText={cancelText}
        theme={theme}
        showCaption={showCaption}
        dateConfig={dateConfig}
        value={value}
        isOpen={isOpen}
        onSelect={onSelect}
        onCancel={onCancel}
        min={min}
      />
    );
};

export default memo(MyDatePicker);