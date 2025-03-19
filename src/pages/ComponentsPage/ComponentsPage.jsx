import React from "react";
import { Btn, Icon, Container } from "components/UI";

const ComponentsPage = () => {
  return (
    <>
      <Container>
        <h1>UI Components Showcase</h1>
        <p>This content is wrapped in a responsive container.</p>

        <section>
          <h2>Buttons</h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <Btn>main</Btn>
            <Btn variant="main" disabled={true}>
              disabled
            </Btn>
            <Btn variant="outlined">outlined</Btn>
            <Btn variant="secondary">singin</Btn>
            <Btn variant="btn-icon">
              <Icon name="icon-star" size="18" color="#050505" />
            </Btn>
            <Btn variant="btn-icon-sm">
              <Icon name="icon-star" size="16" color="#050505" />
            </Btn>

            <Btn variant="outlined">
              Add ingredient
              <Icon name="icon-star" size="18" color="#050505" />
            </Btn>
          </div>
        </section>
        <section>
          <h2>Icons</h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <Icon className="icon" name="icon-star" size="20" color="#050505" />
          </div>
        </section>
      </Container>
    </>
  );
};

export default ComponentsPage;
