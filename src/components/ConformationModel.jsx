import '../styles/ConformationModel.css'

function ConformationModel({
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="confirmation-Overlay" onClick={onCancel}>
      <div
        className="confirmation-modal"
        role="dialog"
        arial-modal="true"
        arial-labelledby="confirmation-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirmation-title">{title}</h2>
        <p>{message}</p>

        <div className="confirmation-buttons">
          <button type="button" className="confirmation-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="confirmation-delete" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConformationModel
