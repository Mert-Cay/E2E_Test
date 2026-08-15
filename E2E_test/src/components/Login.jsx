import { Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const initialData = {
    email: '',
    password: '',
    terms: false
}

const initialErrorMessages = {
    emailError: '',
    passwordError: ''
}


export default function Login() {
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState(initialErrorMessages);
    const [valid, setValid] = useState(false);

    const nav = useNavigate();

    const fieldValue = (name, value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (name === 'email') {
            if(emailRegex.test(value)){
              setError({...error , emailError: '' });            
        }else{
              setError({...error , emailError: 'Wrong Email' });
        }
    }
        if(name=== 'password'){
            if(strongPasswordRegex.test(value)){
                 setError({...error , passwordError: ''});
            }else{
                 setError({...error , passwordError: 'Wrong Password'});
            }
        }

}


    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const valueI = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: valueI });

        fieldValue(name,valueI);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        nav('./success');
    }

    const handleValid = () => {
        let changableValid = formData.email !== '' && formData.password !== '' && formData.terms && error.emailError === '' && 
        error.passwordError === '';
        setValid(changableValid);
    }


    useEffect(() => {
        handleValid();
    } , [formData , error])

    return (

        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='email'>
                        Email
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                            invalid={error.emailError !== ''}
                        />
                        <FormFeedback>{error.emailError}</FormFeedback>
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label for='password'>
                        password
                        <Input
                            id='password'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            invalid={error.passwordError !== ''}
                        />
                        <FormFeedback>{error.passwordError}</FormFeedback>
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>
                        <Input
                            id='terms'
                            name='terms'
                            type='checkbox'
                            onChange={handleChange}
                            checked = {formData.terms}
                        />
                        Agree this terms
                    </Label>
                </FormGroup>

                <Button type='submit' disabled={!valid}> Sign in </Button>

            </Form>
        </>


    )
}
