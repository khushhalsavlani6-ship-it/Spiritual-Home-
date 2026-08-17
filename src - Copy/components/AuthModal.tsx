import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, MapPin, Building, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerAddress } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    authModalMessage,
    loginCustomer,
    registerCustomer,
    showToast
  } = useStore();

  // Login form state - Strictly NO artificial default values
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state - Strictly NO artificial default values
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regState, setRegState] = useState('');
  const [regPincode, setRegPincode] = useState('');
  const [regLandmark, setRegLandmark] = useState('');
  const [regError, setRegError] = useState('');

  // Forgot password view
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your registered email address or mobile number.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your account password.');
      return;
    }

    const res = loginCustomer(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setLoginIdentifier('');
      setLoginPassword('');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regFullName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please provide a valid email address.');
      return;
    }
    if (!regMobile.trim() || regMobile.length < 10) {
      setRegError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setRegError('Password must be at least 4 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Password confirmation does not match.');
      return;
    }
    if (!regAddress.trim() || !regCity.trim() || !regState.trim() || !regPincode.trim()) {
      setRegError('Please fill in complete shipping address (Street, City, State, PIN code).');
      return;
    }

    const shippingAddress: CustomerAddress = {
      fullName: regFullName.trim(),
      mobile: regMobile.trim(),
      addressLine1: regAddress.trim(),
      city: regCity.trim(),
      state: regState.trim(),
      pincode: regPincode.trim(),
      landmark: regLandmark.trim() || undefined
    };

    const res = registerCustomer({
      fullName: regFullName,
      email: regEmail,
      mobile: regMobile,
      password: regPassword,
      shippingAddress
    });

    if (!res.success) {
      setRegError(res.message);
    } else {
      // Clear form
      setRegFullName('');
      setRegEmail('');
      setRegMobile('');
      setRegPassword('');
      setRegConfirmPassword('');
      setRegAddress('');
      setRegCity('');
      setRegState('');
      setRegPincode('');
      setRegLandmark('');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes('@')) {
      setLoginError('Please enter a valid email for password recovery.');
      return;
    }
    setForgotSubmitted(true);
    showToast('Password recovery instructions have been sent to your email.');
  };

  return (
    <div
      id="customer-auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div
        id="customer-auth-modal-card"
        className="relative w-full max-w-lg bg-[#FAF8F5] text-[#2C241E] rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-8"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#9E3809] via-[#B84A14] to-[#802204] p-6 text-white text-center relative">
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <span className="text-2xl font-serif-spiritual">ॐ</span>
          </div>

          <h2 className="text-2xl font-bold font-serif-spiritual tracking-wide">
            {isForgotPassword
              ? 'Account Recovery'
              : authModalMode === 'login'
              ? 'Customer Sign In'
              : 'Create Customer Account'}
          </h2>
          <p className="text-xs text-amber-100/90 mt-1 max-w-xs mx-auto">
            {authModalMode === 'login'
              ? 'Access your orders, saved addresses, and secure PhonePe payments'
              : 'Register to unlock consecrated spiritual essentials and order tracking'}
          </p>
        </div>

        {/* Mandatory prompt banner if opened from checkout or add to cart */}
        {authModalMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 font-medium shadow-sm">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950">Authentication Required</p>
              <p className="mt-0.5">{authModalMessage}</p>
            </div>
          </div>
        )}

        {/* Tab switchers */}
        {!isForgotPassword && (
          <div className="flex border-b border-[#E8DFC8] bg-[#F4EFE6] px-6 pt-2">
            <button
              type="button"
              id="auth-tab-login"
              onClick={() => {
                setAuthModalMode('login');
                setLoginError('');
              }}
              className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 cursor-pointer ${
                authModalMode === 'login'
                  ? 'border-[#9E3809] text-[#9E3809] bg-[#FAF8F5] rounded-t-xl'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              id="auth-tab-register"
              onClick={() => {
                setAuthModalMode('register');
                setRegError('');
              }}
              className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 cursor-pointer ${
                authModalMode === 'register'
                  ? 'border-[#9E3809] text-[#9E3809] bg-[#FAF8F5] rounded-t-xl'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              New Customer Registration
            </button>
          </div>
        )}

        {/* Body content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* FORGOT PASSWORD VIEW */}
          {isForgotPassword ? (
            <div>
              {forgotSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Recovery Link Dispatched</h3>
                  <p className="text-xs text-neutral-600 mt-2 max-w-sm mx-auto">
                    We have dispatched password reset instructions to <strong>{forgotEmail}</strong>. Please check your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setForgotSubmitted(false);
                    }}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-[#9E3809] text-white text-xs font-semibold hover:bg-[#802204] cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-xs text-neutral-600">
                    Enter the email address registered with your Spiritual Home account to receive password reset instructions.
                  </p>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        id="forgot-password-email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="e.g. devotee@example.com"
                        autoComplete="off"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#9E3809] text-white text-xs font-semibold hover:bg-[#802204] cursor-pointer shadow-md"
                    >
                      Send Reset Instructions
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : authModalMode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Email Address or 10-Digit Mobile
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="customer-login-identifier"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Enter email or mobile number"
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-neutral-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-[11px] text-[#9E3809] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    id="customer-login-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                id="customer-login-submit-btn"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#9E3809] hover:bg-[#802204] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-950/20 transition-all cursor-pointer transform active:scale-98"
              >
                <span>Sign In Securely</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-neutral-600">
                  New to Spiritual Home?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('register');
                      setRegError('');
                    }}
                    className="font-bold text-[#9E3809] hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {regError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="customer-reg-fullname"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      id="customer-reg-email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="devotee@example.com"
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      id="customer-reg-mobile"
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      placeholder="10-digit Indian Mobile"
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      id="customer-reg-password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimum 4 characters"
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      id="customer-reg-confirmpassword"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="pt-2 border-t border-[#E8DFC8]">
                <p className="text-xs font-bold text-neutral-800 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9E3809]" />
                  <span>Default Shipping Address</span>
                </p>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-0.5">
                      Flat / House No. / Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="customer-reg-address"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="e.g. 108, Divine Heights, Temple Road"
                      autoComplete="off"
                      className="w-full px-3.5 py-1.5 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 mb-0.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="customer-reg-city"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        placeholder="e.g. Varanasi"
                        autoComplete="off"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 mb-0.5">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="customer-reg-state"
                        value={regState}
                        onChange={(e) => setRegState(e.target.value)}
                        placeholder="e.g. Uttar Pradesh"
                        autoComplete="off"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 mb-0.5">
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="customer-reg-pincode"
                        value={regPincode}
                        onChange={(e) => setRegPincode(e.target.value)}
                        placeholder="6 digits"
                        maxLength={6}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-0.5">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      id="customer-reg-landmark"
                      value={regLandmark}
                      onChange={(e) => setRegLandmark(e.target.value)}
                      placeholder="e.g. Near Kashi Temple"
                      autoComplete="off"
                      className="w-full px-3.5 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="customer-reg-submit-btn"
                className="w-full mt-3 py-3 px-4 rounded-xl bg-[#9E3809] hover:bg-[#802204] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-950/20 transition-all cursor-pointer transform active:scale-98"
              >
                <span>Complete Registration & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-neutral-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('login');
                      setLoginError('');
                    }}
                    className="font-bold text-[#9E3809] hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
