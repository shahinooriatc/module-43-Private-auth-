import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [LoggedInUser, setLoggedInUser] = useContext(userContext);
    const onSubmit = data => console.log(data);
    // watch input value by passing the name of it
    console.log(watch("name"));

    return (
        <form className='shipment-form' onSubmit={handleSubmit(onSubmit)}>
            <input className='input' defaultValue={LoggedInUser.displayName} {...register("name", { required: true })} placeholder='Name' />
            {errors.name && <span className='errors'>Name is required</span>}

            <input className='input' defaultValue={LoggedInUser.email} {...register("email", { required: true })} placeholder='Email' />
            {errors.email && <span className='errors'>Name is required</span>}

            <input className='input' {...register("address", { required: true })} placeholder='Address' />
            {errors.address && <span className='errors'>Name is required</span>}

            <input className='input' {...register("city", { required: true })} placeholder='City' />
            {errors.city && <span className='errors'>Name is required</span>}

            <input className='input' {...register("phone", { required: true })} placeholder='Phone' />
            {errors.phone && <span className='errors'>Name is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;