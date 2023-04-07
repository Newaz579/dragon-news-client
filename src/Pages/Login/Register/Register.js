import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);
    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                handleUpdateUserProfile(name, photoURL);
                handleEmailVerification();
                toast.success('Check Email & verify your email address.');
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    }

    const handleUpdateUserProfile = (userName, photoURL) => {
        const profile = {
            displayName: userName,
            photoURL: photoURL
        };
        updateUserProfile(profile)
            .then(() => { })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleEmailVerification = () => {
        verifyEmail()
            .then(() => { })
            .catch((error) => console.error(error));
    }

    const handleAccepted = (event) => {
        setAccepted(event.target.checked);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Your Name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control name='photoURL' type="text" placeholder="Photo URL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    onClick={handleAccepted}
                    label={
                        <>
                            Accept <Link to='/termsAndCondition'>Terms And Condition</Link>
                        </>
                    }
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!accepted}>
                Submit
            </Button>
            <Form.Text className="text-danger">
                {error}
            </Form.Text>
        </Form>
    );
};

export default Register;