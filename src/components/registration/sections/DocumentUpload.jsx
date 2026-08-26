import { useRef } from "react";

const documentTypes = [
    {
        key: "photo",
        label: "Passport Size Photograph",
        description: "JPG or PNG, maximum 2 MB",
        accept: "image/jpeg,image/png",
        required: true
    }
];

function DocumentUpload({ formData, onChange }) {
    const fileInputRefs = useRef({});

    const handleFileChange = (event, documentKey) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        onChange({
            target: {
                name: documentKey,
                value: file
            }
        });
    };

    const removeFile = (documentKey) => {
        onChange({
            target: {
                name: documentKey,
                value: null
            }
        });

        if (fileInputRefs.current[documentKey]) {
            fileInputRefs.current[documentKey].value = "";
        }
    };

    return (
        <section className="registration-section">

            <div className="section-header">

                <div className="section-icon">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>

                <div>
                    <h2>Upload Documents</h2>
                    <p>
                        Upload the required documents in the specified format.
                    </p>
                </div>

            </div>

            <div className="section-divider"></div>

            <div className="form-grid">

                {documentTypes.map((document) => {

                    const selectedFile = formData[document.key];

                    return (
                        <div
                            className="form-field span-full"
                            key={document.key}
                        >

                            <div className="document-upload-card">

                                <div className="document-upload-header">

                                    <div>
                                        <div className="document-title">
                                            {document.label}

                                            {document.required && (
                                                <span className="required-mark">
                                                    *
                                                </span>
                                            )}
                                        </div>

                                        <div className="document-description">
                                            {document.description}
                                        </div>
                                    </div>

                                    <i className="fa-regular fa-file"></i>

                                </div>

                                {!selectedFile ? (
                                    <label className="document-upload-area">

                                        <i className="fa-solid fa-cloud-arrow-up"></i>

                                        <span>
                                            Click to choose a file
                                        </span>

                                        <small>
                                            Supported files as specified above
                                        </small>

                                        <input
                                            ref={(element) => {
                                                fileInputRefs.current[
                                                    document.key
                                                ] = element;
                                            }}
                                            type="file"
                                            accept={document.accept}
                                            onChange={(event) =>
                                                handleFileChange(
                                                    event,
                                                    document.key
                                                )
                                            }
                                            hidden
                                        />

                                    </label>
                                ) : (
                                    <div className="selected-file">

                                        <div className="selected-file-info">

                                            <i className="fa-solid fa-file"></i>

                                            <div>
                                                <strong>
                                                    {selectedFile.name}
                                                </strong>

                                                <small>
                                                    {(
                                                        selectedFile.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </small>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            className="document-remove-btn"
                                            onClick={() =>
                                                removeFile(document.key)
                                            }
                                            aria-label={`Remove ${document.label}`}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>

                                    </div>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default DocumentUpload;
