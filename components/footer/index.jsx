import React from "react";

export default function Footer() {
  return (
    <div className="container-fluid container-footer">
      <div className="row row-footer">
        <div className="col-md-3 d-flex justify-content-start align-items-start footer-text-position">
          <h6 className="footer-text">2020 FazzPay. All right reserved.</h6>
        </div>
        <div className="col-md-9 d-flex justify-content-end align-items-end">
          <div className="col-md-9 d-flex justify-content-end align-items-center">
            <h6 className="footer-text">+62 5637 8882 9901</h6>
          </div>
          <div className="col-md-3 d-flex justify-content-center align-items-center">
            <h6 className="footer-text">contact@fazzpay.com</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
