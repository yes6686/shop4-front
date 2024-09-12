

function Receiver({copyUser}){

	return (
		<>
			<div className="receiverSection">
				<h3>RECEIVER</h3>
				<hr/>

				<button type="button" onClick="setUserInfo">위와 통일</button>

				<br/><br/>

				<span>Name</span>
				<input 
					type="text"
				 	className="form-control"
				></input>

				<br/>

				<span>TEL</span>
				<input type="text" className="form-control"></input>

				<br/>

				<span>EMAIL</span>
				<input type="text" className="form-control"></input>

				<br/>

				<span>ADRESS</span>
				<input type="text" className="form-control"></input>
			</div>
		</>
	)
}

export default Receiver;