function Withdraw(){
  const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');
  const [amount, setAmount]   = React.useState('');

  return (
    <Card
      bgcolor="info"
      header={
        <div style={{ textAlign: 'center' }}>
          Withdraw
        </div>
      }
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} setAmount={setAmount}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus} amount={amount}/>}
    />
  )
}

function WithdrawMsg(props){
  return (
    <>
      <h5>Success, you withdrew {props.amount}!</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
            props.setAmount('');
        }}>
          Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`You withdrew: ${amount}`);
            props.setAmount(amount);
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Withdrawal failed')
            console.log('err:', text);
        }
    });
  }

  return (
    <>
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>

      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}/><br/>

      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Withdraw
      </button>
    </>
  );
}
