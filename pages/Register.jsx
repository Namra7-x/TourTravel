import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BtnBlue from '../components/Btn-Blue';
import { extractSession, registerUser } from '../services/authApi';
import useAuthStore from '../store/authStore';

const Register = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [status, setStatus] = useState({ loading: false, error: '', success: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setStatus({ loading: false, error: 'Passwords do not match.', success: '' });
            return;
        }

        setStatus({ loading: true, error: '', success: '' });

        try {
            const responseData = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            const session = extractSession(responseData);

            if (session.user || session.token) {
                setAuth({
                    user: session.user ?? { name: formData.name, email: formData.email },
                    token: session.token,
                });
                navigate('/');
                return;
            }

            setStatus({
                loading: false,
                error: '',
                success: responseData.message || 'Account created. You can sign in now.',
            });
            return;
        } catch (error) {
            setStatus({
                loading: false,
                error: error.message || 'Unable to register right now.',
                success: '',
            });
            return;
        }
    };

    return (
        <div className="relative overflow-hidden bg-[#f7f8fc] py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(85,143,252,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(22,22,24,0.1),transparent_34%)]" />

            <div className="relative mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="order-2 rounded-4xl border border-gray-100 bg-white p-8 shadow-[0_30px_80px_rgba(22,22,24,0.08)] lg:order-1 lg:p-10"
                >
                    <div className="mb-8 space-y-3">
                        <h2 className="text-3xl font-semibold text-[#161618]">Create your account</h2>
                        <p className="text-[#56575c]">
                            Register against your backend API and store the returned session for the travel dashboard.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#161618]">Full name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none transition-colors placeholder:text-[#8a8f98] focus:border-[#558ffc]"
                                required
                            />
                        </div>

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

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#161618]">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create password"
                                    className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none transition-colors placeholder:text-[#8a8f98] focus:border-[#558ffc]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#161618]">Confirm password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat password"
                                    className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none transition-colors placeholder:text-[#8a8f98] focus:border-[#558ffc]"
                                    required
                                />
                            </div>
                        </div>

                        {status.error ? (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {status.error}
                            </div>
                        ) : null}

                        {status.success ? (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                {status.success}
                            </div>
                        ) : null}

                        <BtnBlue
                            type="submit"
                            title={status.loading ? 'Creating account...' : 'Create account'}
                            className="w-full justify-center"
                            disabled={status.loading}
                        />
                    </form>

                    <p className="mt-6 text-sm text-[#56575c]">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-[#161618] underline decoration-[#558ffc] underline-offset-4">
                            Sign in
                        </Link>
                    </p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                    className="order-1 space-y-8 rounded-4xl border border-[#dfe7ff] bg-[linear-gradient(160deg,#558ffc_0%,#7c9ff8_55%,#161618_100%)] p-8 text-white shadow-2xl shadow-slate-900/10 lg:order-2 lg:p-12"
                >
                    <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                        New traveler account
                    </div>

                    <div className="space-y-5">
                        <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight lg:text-6xl">
                            Set up your travel profile in a few steps.
                        </h1>
                        <p className="max-w-xl text-lg leading-8 text-white/75">
                            This form is ready to point at your backend register endpoint. You can store JWT, cookie sessions, or user data after the API responds.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            'Name, email, password',
                            'Backend validation',
                            'Auto sign-in ready',
                        ].map((item) => (
                            <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-5 text-sm text-white/80 backdrop-blur-sm">
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default Register;