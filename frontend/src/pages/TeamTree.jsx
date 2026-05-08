import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamTree } from "../features/team/teamSlice";
import MainLayout from "../components/MainLayout";

function TreeNode({ node }) {
  return (
    <div style={{ marginLeft: "30px", marginTop: "15px" }}>
      
      <div
        style={{
          background: "#fff",
          padding: "12px",
          borderRadius: "10px",
          borderLeft: "5px solid #0f766e",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
        }}
      >
        <h5>{node.name}</h5>
        <p>{node.email}</p>
        <small>Level: {node.level}</small>
      </div>

      {node.children?.length > 0 &&
        node.children.map((child) => (
          <TreeNode key={child.id} node={child} />
        ))}
    </div>
  );
}

function TeamTree() {
  const dispatch = useDispatch();

  const { tree, loading, error } = useSelector(
    (state) => state.team
  );

  useEffect(() => {
    dispatch(fetchTeamTree());
  }, [dispatch]);

  return (
    <MainLayout>
      <h2>🌳 Team Tree</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : tree ? (
        <TreeNode node={tree} />
      ) : (
        <p>No Team Found</p>
      )}
    </MainLayout>
  );
}

export default TeamTree;