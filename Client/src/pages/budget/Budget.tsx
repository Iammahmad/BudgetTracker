import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ExpenseTable, AddExpense } from '../../components';
import './budget.css';

const applogo = process.env.PUBLIC_URL + "/Images/Budget-logo.png";
const userlogo = process.env.PUBLIC_URL + "/Images/profile.png";

const Budget = () => {
    const [token, setToken] = useState<string>('');
    const [showAddOverlay, setShowAddOverlay] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken || '');

        if (!storedToken) {
            navigate('/signin');
        }
    }, [navigate]);

    const handleShowAddOverlay = (show: boolean) => {
        setShowAddOverlay(show);
    };

    return (
        <>
            <article>
                <header className='header'>
                    <div className='icon-wrapper'>
                        <img className='img' src={applogo} alt="app logo" />
                        <h4>Budget Tracker</h4>
                    </div>
                    <div className='profile-wrapper'>
                        <NavLink to="/signin">Sign Out</NavLink>
                        <img className='pro-img' src={userlogo} alt="" />
                    </div>
                </header>
                <article className='b-body'>
                    <ExpenseTable token={token} showAddOverlay={handleShowAddOverlay} />
                </article>
                {showAddOverlay && (
                    <AddExpense token={token} onClose={() => setShowAddOverlay(false)} onAddSuccess={() => handleShowAddOverlay(false)} />
                )}
            </article>
        </>
    );
};

export default Budget;
