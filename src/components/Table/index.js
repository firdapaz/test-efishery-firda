/* eslint-disable react/no-array-index-key */
// TODO: to provide & handle sort in every header content
import React, { useContext, useState } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import JsonToForm from 'json-reactform';
import { TestContext } from '../../context';

import Sort from '../../assets/icon/Sort';
import Alert from '../Alert';

const Table = ({ headerContents, tableContents, addModel, alertType }) => {
  const {
    handleSearch,
    handleSort,
    handleAddItem,
    showAlert,
    handleShowAlert,
    sortType,
  } = useContext(TestContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderContent = () => {
    return (
      <div className="table-container">
        {tableContents?.map((content, i) => {
          return (
            content && (
              <Row
                className="table-items no-gutters"
                key={`content-${i}`}
                data-testid={`content-${i}`}
              >
                {content.result?.map((col, colIdx) => (
                  <div
                    key={`col-${colIdx}`}
                    type="label"
                    bold={col.bold}
                    className={`${col.align}`}
                    style={{
                      width: headerContents[colIdx].width,
                      ...col.style,
                    }}
                  >
                    {col.text}
                  </div>
                ))}
              </Row>
            )
          );
        })}
      </div>
    );
  };

  const renderModalAdd = () => {
    return (
      <Modal
        show={show}
        onHide={() => handleClose()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Tambah Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JsonToForm
            model={addModel}
            onSubmit={param => {
              handleAddItem(param);
              setShow(false);
            }}
          />
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Col>
      <h2>Tech Test Firda</h2>
      <input
        className="search"
        type="text"
        placeholder="Silakan cari kata kunci"
        onChange={e => {
          // const searchProps = {
          //   komoditas: key,
          //   area_province: key,
          //   area_kota: key,
          //   size: key,
          //   price: key,
          //   tgl_parsed: key,
          //   timestamp: key,
          // };
          handleSearch(e.target.value);
        }}
      />
      <Button size="sm" onClick={() => handleShow()}>
        Add
      </Button>

      <div className="mt-4">
        <Alert
          showAlert={showAlert}
          message="Berhasil!"
          variant={alertType}
          handleShowAlert={handleShowAlert}
        />
      </div>
      <Row noGutters className="row-header">
        {headerContents.map((content, idx) => (
          <div
            style={{ width: content.width }}
            className={`table-header ${content.align}`}
            key={content.text}
          >
            {content.text}
            <button
              className="btn-sort"
              onClick={() => handleSort(content.order, sortType === 'asc' ? 'desc' : 'asc')}
            >
              <Sort type={sortType} />
            </button>
          </div>
        ))}
      </Row>
      {renderContent()}
      {renderModalAdd()}
    </Col>
  );
};

export default Table;
