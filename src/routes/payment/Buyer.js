

function Buyer({copyUser}){

	return(
		<>
		<div className="buyerSection">
				<h3>Buyer</h3>
				<hr/>
				<span>Name</span>
				<input 
					type="text" 
					className="form-control" 
					value={copyUser.name}
				/>

				<br/>

				<span>TEL</span>
				<input type="text" className="form-control" 
						placeholder={copyUser.phone}
				/>

				<br/>

				<span>EMAIL</span>
				<input type="text" className="form-control"
						placeholder={copyUser.email}
				/>

				<br/>

				<span>ADRESS</span>
				<input type="text" className="form-control"
						placeholder={copyUser.address}
				/>
			</div>
		
		</>
	)
}

export default Buyer;