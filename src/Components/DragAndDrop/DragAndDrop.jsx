import { useCallback, useState, useEffect } from "react";
import "./dragAndDrop.css";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function DragAndDropSingUp(props) {
  const [arrayOfImages, setArrayOfImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setArrayOfImages(
      acceptedFiles.map((file) => {
        return Object.assign(file, { preview: URL.createObjectURL(file) });
      })
    );

    props.setFile([...arrayOfImages]);
  }, []);

  useEffect(() => {
    props.setFile([...arrayOfImages]);
  }, [arrayOfImages]);

  const handleOnClickDeletPicutre = (event, value) => {
    event.stopPropagation();

    for (let i = 0; i < arrayOfImages.length; i++) {
      if (arrayOfImages[i].name === value) {
        const arrayOfImagesCopy = [...arrayOfImages];
        arrayOfImagesCopy.splice(i, 1);
        setArrayOfImages([...arrayOfImagesCopy]);
      }
    }
  };

  const thumbs = arrayOfImages.map((picture) => {
    return (
      <div key={picture.name} className="thumb">
        <div>
          <p>{picture.name}</p>
          <div>
            <button
              type="button"
              onClick={(event) =>
                handleOnClickDeletPicutre(event, picture.name)
              }
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img
              src={picture.preview}
              onLoad={() => {
                URL.revokeObjectURL(picture.preview);
              }}
            />
          </div>
        </div>
      </div>
    );
  });

  const maxFilesAuthorized = 1;

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({ multiple: false, onDrop, accept: { "image/*": [] } });

  const rejectedItems = fileRejections.map((picture) => {
    return (
      <li key={picture.file.path}>
        {picture.file.path}
        <ul>
          {picture.errors.map((error) => {
            if (error.code === "file-invalid-type") {
              return (
                <li key={error.code}>Ton fichier n'est pas au bon format.</li>
              );
            }
            if (error.code === "too-many-files") {
              return (
                <li key={error.code}>
                  tu as dépassé le nombre maximal autorisé (Maximum
                  {maxFilesAuthorized} photos).
                </li>
              );
            } else {
              return <li key={error.code}>{error.message}</li>;
            }
          })}
        </ul>
      </li>
    );
  });

  return (
    <div className="dropzone-section">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragReject ? (
          <p className="drag-Reject">Ton fichier n'est pas valide.</p>
        ) : isDragActive ? (
          <p className="drag-Accept">Dépose votre photo.</p>
        ) : (
          <p>Glisse et dépose une photo ou clique pour la séléctionner.</p>
        )}
        <button type="button">
          <FontAwesomeIcon icon={faPlus} />
          &nbsp;Clique
        </button>
      </div>
      <div className="pictures-status">
        {acceptedFiles.length === 0 && rejectedItems.length === 0 ? (
          <p>
            Dépose une image pour personaliser ton avatar. <br />
            Veille à choisir un format adapté (image).
          </p>
        ) : (
          ""
        )}
        {acceptedFiles.length !== 0 && arrayOfImages.length !== 0 && (
          <div className="pictures-accepted">
            <h4>Ton image est acceptée:</h4>
            <div>{thumbs}</div>
          </div>
        )}
        {rejectedItems.length !== 0 && (
          <div className="pictures-rejected">
            <h4>Fichier(s) refusé(s):</h4>
            <ul>{rejectedItems}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
