import React from 'react'
import './BlankForm.css'

interface IProps {}

const BlankForm: React.FC<IProps> = () => {
  return (
    <div className="blank-form">
      <div className="form-header">
        ЗАДАНИЕ ДЛЯ ВСТРЕЧИ
        <br />
        «НАША ХРИСТИАНСКАЯ ЖИЗНЬ
        <br />И СЛУЖЕНИЕ»
      </div>

      <div className="form-group">
        <div className="label">Имя:</div>
        <div className="input">Петров Иван</div>
      </div>

      <div className="form-group">
        <div className="label">Напарник:</div>
        <div className="input">Иванов Петр</div>
      </div>

      <div className="form-group">
        <div className="label">Дата:</div>
        <div className="input">Август 02</div>
      </div>

      <div className="form-group">
        <div className="label">Задание №:</div>
        <div className="input">3</div>
      </div>

      <div className="checkbox-group">
        <div className="label">Преподносится:</div>
        <div>
          <input type="checkbox" checked readOnly /> В главном зале
        </div>
        <div>
          <input type="checkbox" /> В первом классе
        </div>
        <div>
          <input type="checkbox" /> Во втором классе
        </div>
      </div>

      <div className="note">
        <strong>Примечание для учащегося.</strong> Материал для этого задания и
        номер урока указаны в рабочей тетради «Жизнь и служение». Воспользуйтесь
        руководством к своему заданию из «Указаний для встречи „Наша
        христианская жизнь и служение“» (S-38).
      </div>
      <div className="footer">
        <p>S-89-U</p>
        <p>11/23</p>
      </div>
    </div>
  )
}

export default BlankForm
