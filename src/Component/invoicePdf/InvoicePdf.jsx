import { useLocation } from "react-router-dom";

const InvoicePdf = ({ style, id, order }) => {
    const location = useLocation();
    const viewOrder = location.state ? location?.state?.orderInfo : null;
    return (
        <div id={id} style={style}>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" />
          <title>Invoice</title>
          <style dangerouslySetInnerHTML={{__html: "\n        \n    " }} />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <a target="_blank" href="https://printbaz.com/">
                  <img src="https://media.discordapp.net/attachments/1069579536842379305/1103281899469811712/logo01.png?width=1440&height=392" style={{width: '10%', marginTop: '50px'}} alt="" />
                </a>
              </div>
              <div className="row" style={{marginTop: '50px'}}>
                <div className="col-6 invoice-to" style={{display: 'inline-block'}}>
                  <h2>Invoice To</h2>
                  <p>e: {order?.userMail}</p>
                  <p>p: {order?.phone}</p>
                </div>
                <div className="col-6 card" style={{width: '18rem', display: 'inline-block'}}>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">Total Paid Out: BDT {viewOrder?.recvMoney}</li>
                    <li className="list-group-item">Invoice Date: {viewOrder?.createdAt}</li>
                    <li className="list-group-item bg-light">Order Id {viewOrder?.id}</li>
                  </ul>
                </div>
              </div>
              <div className="row" style={{marginTop: '50px', marginBottom: '30px', backgroundColor: 'aliceblue'}}>
                <div className="col-12">
                  <h2 className="my-3">Payment Break Down</h2>
                </div>
                <div className="col-md-2 col-sm-12 mb-3">
                  <strong>Order Info</strong>
                  <p>{viewOrder?.name}</p>
                  <p>{viewOrder?.phone}</p>
                  <p>{viewOrder?.address}</p>
                </div>
                <div className="col-md-2 col-sm-12 mb-3">
                  <strong>Invoice Type</strong>
                  <p>{viewOrder?.orderStatus}</p>
                </div>
                <div className="col-md-2 col-sm-12 mb-3">
                  <strong>Printbaz Cost</strong>
                  <p>{viewOrder?.printbazcost}</p>
                </div>
                <div className="col-md-2 col-sm-12 mb-3">
                  <strong>Delivery Fee</strong>
                  <p>{viewOrder?.deliveryFee}</p>
                </div>
                <div className="col-md-2 col-sm-12 mb-3">
                  <strong>Collect Amount</strong>
                  <p>{viewOrder?.collectAmount}</p>
                  
                </div>
                <div className="col-md-1 col-sm-12 mb-3">
                  <strong>Cash Handling Fee</strong>
                  <p>2%</p>
                </div>
                <div className="col-md-1 col-sm-12 mb-3">
                  <strong>Receivable Amount</strong>
                  <p>{viewOrder?.recvMoney}</p>
                </div>
              </div>
              <div className="row">
              </div>
              <div className="row">
                <div className="col-12">
                  <h4 className="my-3">Terms and Conditions:</h4>
                  <p>Payment should be made within 48 hours by bank or mobile-banking.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center" style={{marginTop: '50px'}}>
                  <p>(This is a computer generated invoice and requires no signature)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
     );
    };
    
    export default InvoicePdf;