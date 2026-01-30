import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/userDetails.scss";
import type { IUserDetails } from "./constants/dashboard.dto";
import { fetchUsersById } from "../services/helper";
import { toast } from "react-toastify";

const UserDetails = ({ id, onBack }: any) => {
    const [user, setUser] = useState<IUserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getDetailsById();
    }, [id]);

    const getDetailsById = async () => {
        try {
            if (id) {
                const data = await fetchUsersById(Number(id));
                setUser(data);
            }
        } catch (err) {
            toast.error("Error fetching user details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div className="user-details-page">

            {/* Back */}
            <div className="back-btn" onClick={onBack}>
                <FiArrowLeft />
                <span>Back to Users</span>
            </div>
            <div className="top-action-buttons">
                <h2 className="title">User Details</h2>

                <div className="action-btns">
                    <button className="blacklist-btn">BLACKLIST USER</button>
                    <button className="activate-btn">ACTIVATE USER</button>
                </div>
            </div>


            {/* ===== MAIN HEADER CARD ===== */}
            <div className="header-card">
                <div className="header-section">
                    <div className="left-block">
                        <div className="avatar">{user.firstName[0] || '-'}</div>
                        <div>
                            <h3 className="user-name">{user.name}</h3>
                            <p className="user-id">LSQF{user.id}</p>
                        </div>
                    </div>
                    <div className="middle-block">
                        <p className="tier-label">User’s Tier</p>
                        <div className="stars">★ ☆ ☆</div>
                    </div>
                    <div className="right-block">
                        <h3 className="amount">₦200,000.00</h3>
                        <p className="bank">{user.accountNumber}/Providus Bank</p>
                    </div>

                </div>

                {/* ===== TABS INSIDE HEADER ===== */}
                <div className="tabs">
                    <div className="tab active">General Details</div>
                    <div className="tab">Documents</div>
                    <div className="tab">Bank Details</div>
                    <div className="tab">Loans</div>
                    <div className="tab">Savings</div>
                    <div className="tab">App and System</div>
                </div>
            </div>

            <div className="details-card">

                {/* PERSONAL INFO */}
                <div className="section">
                    <h4>Personal Information</h4>
                    <div className="grid">
                        <div><p className="label">FULL NAME</p><p className="value">{user.name}</p></div>
                        <div><p className="label">PHONE NUMBER</p><p className="value">{user.phone}</p></div>
                        <div><p className="label">EMAIL ADDRESS</p><p className="value">{user.email}</p></div>
                        <div><p className="label">BVN</p><p className="value">{user.phone}</p></div>
                        <div><p className="label">GENDER</p><p className="value">{user.username?.includes("female") ? "Female" : "Male"}</p></div>
                        <div><p className="label">MARTIAL STATUS</p><p className="value">{user.maritalStatus}</p></div>
                        <div><p className="label">CHILDREN</p><p className="value">{user.children}</p></div>
                        <div><p className="label">TYPE OF RESIDENCE</p><p className="value">{user.residenceType}</p></div>
                    </div>
                </div>
                <hr />

                {/* EDUCATION */}
                <div className="section">
                    <h4>Education and Employment</h4>
                    <div className="grid">
                        <div><p className="label">LEVEL OF EDUCATION</p><p className="value">{user.education.level}</p></div>
                        <div><p className="label">EMPLOYMENT STATUS</p><p className="value">{user.education.employmentStatus}</p></div>
                        <div><p className="label">SECTOR OF EMPLOYMENT</p><p className="value">{user.education.sector}</p></div>
                        <div><p className="label">DURATION OF EMPLOYMENT</p><p className="value">{user.education.duration}</p></div>
                        <div><p className="label">OFFICE EMAIL</p><p className="value">{user.officeEmail}</p></div>
                        <div><p className="label">MONTHLY INCOME</p><p className="value">{user.education.monthlyIncome}</p></div>
                        <div><p className="label">LOAN REPAYMENT</p><p className="value">{user.education.loanRepayment}</p></div>
                    </div>
                </div>

                <hr />

                {/* SOCIALS */}
                <div className="section">
                    <h4>Socials</h4>
                    <div className="grid">
                        <div><p className="label">TWITTER</p><p className="value">{user.twitter}</p></div>
                        <div><p className="label">FACEBOOK</p><p className="value">{user.facebook}</p></div>
                        <div><p className="label">INSTAGRAM</p><p className="value">{user.instagram}</p></div>
                    </div>
                </div>

                <hr />

                {/* GUARANTOR */}
                <div className="section">
                    <h4>Guarantor</h4>
                    <div className="grid">
                        <div><p className="label">FULL NAME</p><p className="value">{user.guarantorName}</p></div>
                        <div><p className="label">PHONE NUMBER</p><p className="value">{user.guarantorPhone}</p></div>
                        <div><p className="label">EMAIL</p><p className="value">{user.guarantorEmail}</p></div>
                        <div><p className="label">RELATIONSHIP</p><p className="value">{user.guarantorRelationship}</p></div>
                    </div>
                </div>

            </div>
        </div>
    );

};

export default UserDetails;
