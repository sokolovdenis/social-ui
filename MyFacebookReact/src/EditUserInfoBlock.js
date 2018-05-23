import React, { Component } from 'react';
import './EditUserInfoBlock.css';

class EditUserInfoBlock extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = 'https://social-webapi.azurewebsites.net/api/';

        this.state = {
            token: props.token
        };
    }

    handleEditSubmit(event) {
        event.preventDefault();

        let userEditData = {};
        
        userEditData.name = this.name.value;
        userEditData.birthday = this.birthday.value;

        if (this.info.value !== undefined) {
            userEditData.info = this.info.value;
        }

        const url = this.apiUrl + 'users/me';

        const responsePromise = fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + this.state.token
            },
            body: JSON.stringify(userEditData)
        });

        responsePromise
            .then(function (response) {
                const status = response.status;
                if (status >= 200 && status <= 299) {
                    return response.json();
                }
                else {
                    return Promise.reject(response.statusText);
                }
            })
            .then(data => {
                this.onUploadPhoto();
            })
            .catch(function (error) {
                alert(error);
            });
    }

    onUploadPhoto() {
        if (this.fileInput.value !== undefined) {
            
            let imageFile = this.fileInput.files[0];
            let formData = new FormData();
            formData.append('file', imageFile);

            // Отправим картинку на сервер
            const urlPhoto = this.apiUrl + 'users/me/photo';

            const responsePromisePhoto = fetch(urlPhoto, {
                method: 'PUT',
                headers: {
                    'Authorization': "Bearer " + this.state.token
                },
                body: formData
            });

            responsePromisePhoto
                .then(function (response) {
                    const status = response.status;
                    if (status >= 200 && status <= 299) {
                        return response.json();
                    }
                    else {
                        return Promise.reject(response.statusText);
                    }
                })
                .then(data => {
                    this.props.onNotEditMode();
                })
                .catch(function (error) {
                    alert(error);
                });
        }
        //this.props.onNotEditMode();
    }

    render() {

        return (
            <main>
                <section class="all-user-info">
                    <section class="info-area">
                        <form onSubmit={(event) => this.handleEditSubmit(event)} id="edit-form">
                            <h2>Имя<input type="text" id="new-name" ref={input => this.name= input}/></h2>
                            <p><span>Дата рождения: </span><input type="date" id="new-date" ref={input => this.birthday = input} /></p>
                            <p><span>Информация: </span><input type="text" id="new-info" ref={input => this.info = input} /></p>
                            <p><span>Аватар: </span><input type="file" id="avatar" ref={input => this.fileInput = input} /></p>
                            <input type="submit" class="save-button" value="Сохранить" />
                        </form>
                    </section>
                </section>
            </main>
        );
    }
}

export default EditUserInfoBlock;