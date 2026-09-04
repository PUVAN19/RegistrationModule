import { useRef, useState } from "react";

const documentTypes = [
    {
        key: "photo",
        label: "Passport Size Photograph",
        description: "JPG or PNG, maximum 2 MB",
        accept: "image/jpeg,image/png",
        required: true
    }
];

function DocumentUpload({
    formData,
    onChange,
    validationErrors = {}
}) {
    const fileInputRefs = useRef({});
    const [preview, setPreview] = useState(null);

   const handleFileChange = (event, documentKey) => {
    const file = event.target.files?.[0];

    if (!file) {
        return;
    }

    const allowedTypes = [
        "image/jpeg",
        "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
        onChange({
            target: {
                name: "document",
                value: "Only JPG and PNG images are allowed."
            }
        });

        event.target.value = "";
        return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
        onChange({
            target: {
                name: "document",
                value: "Photograph size must not exceed 2 MB."
            }
        });

        event.target.value = "";
        return;
    }

    onChange({
        target: {
            name: "document",
            value: ""
        }
    });

    onChange({
        target: {
            name: documentKey,
            value: file
        }
    });

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
};

    const removeFile = (documentKey) => {

        onChange({
            target: {
                name: documentKey,
                value: null
            }
        });

        onChange({
            target: {
                name: "documentValidationError",
                value: ""
            }
        });

        setPreview(null);

        if (fileInputRefs.current[documentKey]) {
            fileInputRefs.current[documentKey].value = "";
        }
    };

    return (
        <section className="registration-section">

            {/* HEADER */}

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


            {/* DOCUMENTS */}

            <div className="form-grid">

                {documentTypes.map((document) => {

                    const selectedFile =
                        formData[document.key];

                    return (
                        <div
                            className="form-field span-full"
                            key={document.key}
                        >

                            <div className="document-upload-card">

                                {/* DOCUMENT HEADER */}

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


                                {/* ERROR */}

                                {validationErrors.document && (
                                    <div className="document-error">
                                        <i className="fa-solid fa-circle-exclamation"></i>

                                        {validationErrors.document}
                                    </div>
                                )}


                                {/* SELECT FILE */}

                                {!selectedFile ? (

                                    <label className="document-upload-area">

                                        <i className="fa-solid fa-cloud-arrow-up"></i>

                                        <span>
                                            Click to choose a file
                                        </span>

                                        <small>
                                            JPG or PNG • Maximum 2 MB
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

                                        {/* PREVIEW */}

                                        <div className="selected-file-preview">

                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Selected photograph"
                                                />
                                            ) : (
                                                <i className="fa-solid fa-image"></i>
                                            )}

                                        </div>


                                        {/* FILE INFORMATION */}

                                        <div className="selected-file-info">

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

                                            <small className="file-success">
                                                <i className="fa-solid fa-circle-check"></i>
                                                File selected
                                            </small>

                                        </div>


                                        {/* REMOVE */}

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