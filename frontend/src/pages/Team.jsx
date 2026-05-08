import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../components/MainLayout";
import "../styles/team.css";
function Team() {
  const [direct, setDirect] = useState([]);
  const [indirect, setIndirect] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const directRes = await api.get("/team/direct");
      const indirectRes = await api.get("/team/indirect");

      setDirect(directRes.data.team || []);
      setIndirect(indirectRes.data.team || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const MemberCard = ({ member, type }) => (
    <div className="team-card">
      <div className="team-card-header">
        <div>
          <h4>{member.name}</h4>
          <p>{member.email}</p>
        </div>

        <span
          className={
            type === "direct"
              ? "badge-direct"
              : "badge-indirect"
          }
        >
          {type}
        </span>
      </div>

      <div className="team-info">
        <p>
          🎯 Referral:{" "}
          <strong>{member.referral_code}</strong>
        </p>

        <p>
          📊 Level: <strong>{member.level}</strong>
        </p>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="team-page">

        <div className="team-banner">
          <h2>👥 My Team Network</h2>
          <p>
            Track your direct and indirect referrals
          </p>
        </div>

        {/* STATS */}
        <div className="team-stats">
          <div className="stat-box">
            <h3>{direct.length}</h3>
            <p>Direct Members</p>
          </div>

          <div className="stat-box">
            <h3>{indirect.length}</h3>
            <p>Indirect Members</p>
          </div>

          <div className="stat-box">
            <h3>
              {direct.length + indirect.length}
            </h3>
            <p>Total Network</p>
          </div>
        </div>

        {loading ? (
          <p>Loading team...</p>
        ) : (
          <>
            {/* DIRECT */}
            <section>
              <h3 className="section-title direct-title">
                Direct Team
              </h3>

              <div className="team-grid">
                {direct.length > 0 ? (
                  direct.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      type="direct"
                    />
                  ))
                ) : (
                  <p>No Direct Members</p>
                )}
              </div>
            </section>

            {/* INDIRECT */}
            <section>
              <h3 className="section-title indirect-title">
                Indirect Team
              </h3>

              <div className="team-grid">
                {indirect.length > 0 ? (
                  indirect.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      type="indirect"
                    />
                  ))
                ) : (
                  <p>No Indirect Members</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Team;