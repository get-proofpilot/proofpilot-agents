export default function Consultation() {
  return (
    <section id="consult" className="section-shell consult-band">
      <div>
        <p className="kicker">Next step</p>
        <h2>Invite the right buyer into a design conversation.</h2>
      </div>
      <form>
        <label>
          Name
          <input name="name" placeholder="Client name" />
        </label>
        <label>
          Project type
          <select name="projectType" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Landscape redesign</option>
            <option>Outdoor living build</option>
            <option>Pool and patio coordination</option>
          </select>
        </label>
        <label>
          Project notes
          <textarea name="notes" placeholder="What should the outdoor space become?" />
        </label>
        <button className="button button--dark" type="button">
          Request Walkthrough
        </button>
      </form>
    </section>
  );
}
