import React from "react";

// Добавь поле поиска, которое можно использовать для фильтрации списка контактов по имени.

// Поле поиска это инпут без формы, значение которого записывается в состояние (контролируемый элемент).
// Логика фильтрации должна быть нечувствительна к регистру.
// Поле поиска ренерится только если есть 2 и более сохраненных контактов.

const Filter = ({handleChangeFilter}) => (
  <>
    <p>Finde contacts by name</p>
    <input style={{width: "160px", marginBottom: "16px"}} type="text" onChange={handleChangeFilter}/>
  </>
);

export default Filter;
