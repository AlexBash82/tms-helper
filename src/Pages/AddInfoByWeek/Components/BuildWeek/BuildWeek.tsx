import React, { useState } from 'react'
import './BuildWeek.css'

interface IProps {
  isBildWeekOpen: boolean
  onCloseBildWeek: () => void
}

const BuildWeek: React.FC<IProps> = ({ isBildWeekOpen, onCloseBildWeek }) => {
  if (!isBildWeekOpen) return null
  return (
    <div className="modal-overlay" onClick={onCloseBildWeek}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCloseBildWeek}>
          &times;
        </button>
      </div>
    </div>
  )
}

export default BuildWeek
