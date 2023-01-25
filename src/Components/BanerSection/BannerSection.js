import "./BannerSection.sass"
import Button from "../UI/Button";

const BannerSection = () => {
  return (
    <div className="banner-section">
      <div className="banner-section-content">
        <h1 className="banner-section-heading">Test assignment for front-end developer</h1>
        <p className="banner-section-text">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
          understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They
          should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <Button>Sign up</Button>
      </div>
    </div>
  )
}

export default BannerSection