import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API } from "../config";

const Users = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`${API.USER}`)
            .then(res => {
                setData(res.data.users)
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <div className="inner">
            <table>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(datas => (
                        <tr>
                            <td>{datas.username}</td>
                            <td>{datas.name.first}{datas.name.last}</td>
                            <td>{datas.age}</td>
                            <td>{datas.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users