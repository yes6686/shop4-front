


function OrderList({cartData}) {
	
	return(
		<>
		<div className="section1">
			<h2 style={{textAlign:'center', marginTop:"20px"}}>ORDER</h2>
			<br/>
			{/* 상품 정보들 */}
			<table style={{width:"90%"}}>
				<thead style={{backgroundColor:"black",color:"white",height:"40px",
					fontSize:"20px", fontWeight:'bold'
				}}>
					<tr>
						<td style={{width:'10%'}}>Item</td>
						<td style={{width:'30%'}}>Name</td>
						<td style={{width:"10%"}}>option</td>
						<td style={{width:"10%"}}>Price</td>
						<td style={{width:"10%"}}>Quantity</td>
					</tr>
				</thead>
				<tbody style={{fontSize:"16px"}}>
					{cartData.map((item) => (
						<tr key={item.id} style={{height:"80px"}}>	
							<td style={{paddingLeft: "15px"}}>사진</td>
							<td style={{paddingLeft: "15px"}}>{item.goods.name}</td>
							<td style={{paddingLeft: "15px"}}>옵션</td>
							<td style={{paddingLeft: "15px"}}>{item.goods.price}</td>
							<td style={{paddingLeft: "15px"}}>{item.quantity}</td>	
						</tr>
					))}
				</tbody>
			</table>
		</div>
		</>
	)
}

export default OrderList;