import { Toast, ToastContainer } from 'react-bootstrap';

function ToastComponent(props) {
	return (
		<ToastContainer position="top-end" style={{ margin: 'auto' }}>
			<Toast
				className="d-inline-block m-1"
				bg="danger"
				onClose={() => props.setToast(false)}
				show={props.toast}
				delay={3000}
				autohide
			>
				<Toast.Header>
					<strong className="me-auto">Warning</strong>
				</Toast.Header>
				<Toast.Body className={'text-white'}>{props.msg}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}

export default ToastComponent;
