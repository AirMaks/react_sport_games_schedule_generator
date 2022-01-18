import { observer } from "mobx-react-lite";
import { useState } from "react";


const UserItem = observer(({user, index}) => {
    let date = new Date(user.createdAt);
    return (
        <li key={user.id} className="d-flex align-items-end justify-content-between">
            <div className="d-flex align-items-end">
                <span>{`${index + 1}.`}</span>
                <div>{`${user.login}`}</div>
            </div>
            <div className="d-flex align-items-end">
                <div className="ms-3">[{user.role}]</div>
                <div style={{color: "#ccc", fontSize: 12}} className="ms-3">{`${date.toLocaleString('en-GB').split(',').join(' ')}`}</div>
                <span className="remove-btn" ></span>
            </div>
        </li>
    )
})

export default UserItem;