import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BtnBlue from '../components/Btn-Blue';
import { extractSession, loginUser } from '../services/authApi';
import useAuthStore from '../store/authStore';

const Login = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState({ loading: false, error: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ loading: true, error: '' });

        try {
            const responseData = await loginUser(formData);
            const session = extractSession(responseData);

            setAuth({
                user: session.user ?? { email: formData.email },
                token: session.token,
            });

            navigate('/');
        } catch (error) {
            setStatus({
                loading: false,
                error: error.message || 'Unable to sign in right now.',
            });
            return;
        }

        setStatus({ loading: false, error: '' });
    };

    return (
        <div className="relative overflow-hidden bg-[#f7f8fc] py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(85,143,252,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(22,22,24,0.08),_transparent_32%)]" />

            <div className="relative mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="space-y-8 rounded-[2rem] border border-white/60 bg-[#161618] p-8 text-white shadow-2xl shadow-slate-900/10 lg:p-12"
                >
                    <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
                        Traveler access
                    </div>

                    <div className="space-y-5">
                        <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight lg:text-6xl">
                            Sign in to manage your trips and bookings.
                        </h1>
                        <p className="max-w-xl text-lg leading-8 text-white/70">
                            Connect your backend login endpoint here, persist the returned token or user session, and keep the user signed in across refreshes.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            'Secure API login',
                            'Booking access',
                            'Saved session state',
                        ].map((item) => (
                            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-white/75">
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                    className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-[0_30px_80px_rgba(22,22,24,0.08)] lg:p-10"
                >
                    <div className="mb-8 space-y-3">
                        <h2 className="text-3xl font-semibold text-[#161618]">Welcome back</h2>
                        <p className="text-[#56575c]">
                            Use your account to continue planning the next trip.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#161618]">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="hello@gmail.com"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none transition-colors placeholder:text-[#8a8f98] focus:border-[#558ffc]"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#161618]">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Your password"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none transition-colors placeholder:text-[#8a8f98] focus:border-[#558ffc]"
                                required
                            />
                        </div>

                        {status.error ? (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {status.error}
                            </div>
                        ) : null}

                        <BtnBlue
                            type="submit"
                            title={status.loading ? 'Signing in...' : 'Sign in'}
                            className="w-full justify-center"
                            disabled={status.loading}
                        />
                    </form>

                    <p className="mt-6 text-sm text-[#56575c]">
                        New here?{' '}
                        <Link to="/register" className="font-semibold text-[#161618] underline decoration-[#558ffc] underline-offset-4">
                            Create an account
                        </Link>
                    </p>
                </motion.section>
            </div>
        </div>
    );
};

export default Login;