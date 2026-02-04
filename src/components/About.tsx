const About = () => {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ maxWidth: 860 }}>
        <h2>About This App</h2>
        <p>
          This application displays the current local time for a selection of popular cities
          around the world. Times are fetched live from the <a href="https://time.now">time.now</a> world time API.
        </p>

        <div style={{ marginTop: 16 }} className="city-details">
          <p>
            Built with React, Vite and TypeScript. It demonstrates use of hooks, client-side routing
            and asynchronous data fetching without external date libraries. The design follows a clean
            card-based system with rounded corners, subtle shadows, and a primary blue accent color.
          </p>
        </div>

        <p style={{ marginTop: 12, fontSize: 13, color: '#555' }}>
          Data source: <a href="https://time.now/developer">time.now Developer API</a>. Please see their
          documentation for usage and attribution. Per their request, please include a link back to Time.now in your app.
        </p>
      </div>
    </div>
  );
};

export default About;