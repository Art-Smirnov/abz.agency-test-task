const ImageUploader = ({error, onChange}) => {
  return (
    <div className="form-section-image-uploader">
      <label htmlFor="photo">
        <span id="file-name" className="form-section-image-uploader-box">Upload your photo</span>
        <span className="form-section-image-uploader-button">
          Upload
        </span>
      </label>
      <input
        name="photo"
        type="file"
        id="photo"
        className="form-section-image-uploader-input"
        onChange={onChange}
      />
      {error ? (
        <span className="form-section-error">{error}</span>
      ) : null}
    </div>
  )
}
export default ImageUploader
