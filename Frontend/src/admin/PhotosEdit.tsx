import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import {Redirect} from 'react-router-dom';
import {Photo} from "../interfaces/photo";

const PhotosEdit = (props: PropsWithRef<any>) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:8000/api/photos/${props.match.params.id}`);

                const photo: Photo = await response.json();

                setTitle(photo.title);
                setImage(photo.image)
            }
        )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:8000/api/photos/${props.match.params.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                image
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={'/admin/photos'}/>
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title"
                           defaultValue={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" name="image"
                           defaultValue={image}
                           onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default PhotosEdit;
