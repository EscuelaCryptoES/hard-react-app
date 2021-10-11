import React from "react";

export function NoWalletDetected() {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6 p-4 text-center">
          <p>
            No se ha detectado una wallet de Metamask. <br />
            <a
              href="http://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Por favor, instala la extensión
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
