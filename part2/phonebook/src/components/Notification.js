import React from 'react'
import {Intent, Position, Toast, Toaster, ToasterPosition} from "@blueprintjs/core";

const Notification = (props) => {
	if(props.m.message === null){
		return null
	}
	if(props.m.category === "success"){
		return(
            <Toaster position={Position.TOP}>
                <Toast message={props.m.message} intent={Intent.SUCCESS} position />
            </Toaster>
		)
	}
	return(
        <Toaster position={Position.TOP}>
                <Toast message={props.m.message} intent={Intent.DANGER} position />
        </Toaster>
	)
}

export default Notification