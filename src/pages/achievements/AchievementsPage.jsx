import Achievements from '../components/Achievements';

export default function AchievementsPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <p className="page-breadcrumb">achievements</p>
            </div>
            <Achievements />
        </div>
    );
}