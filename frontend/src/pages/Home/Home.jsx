import Button from "@mui/material/Button";
import externaticLogo from "../../assets/EXTERNATIC-LOGO-VERTICAL-RVB-removebg-preview.png";
// import backGroundImage from "../../assets/tim-mossholder-GOMhuCj-O9w-unsplash-1024x683.jpg";
import TopAnnoncesCard from "../../components/TopAnnoncesCard/TopAnnoncesCard";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <div className={styles.logo}>
        <img src={externaticLogo} alt="Logo externatic" />
      </div>
      <h1>
        Vos Opportunités d'emploi, <br />
        uniquement chez les client finaux
      </h1>
      <p className={styles.introductionText}>
        Si vous recherchez des opportunités d'emploi dans le domaine
        informatique, le cabinet de recrutement Externatic peut mettre à votre
        disposition une équipe de consultants en technologie de l'information,
        pour vous aider à trouver l'emploi qui vous correspond. Notre cabinet de
        recrutement s'attache à placer l'humain au centre de son action. Nous
        nous appuyons ainsi sur des méthodes authentiques pour vous accompagner
        dans al recherche de votre emploi.
      </p>
      <div className={styles.buttons}>
        <Button variant="contained">Contained Action</Button>
        <Button variant="outlined">Outlined Action</Button>
      </div>
      <div className={styles.containerImg}>
        {/* <img src={backGroundImage} alt="Back ground" /> */}
      </div>
      <section className={styles.aboutText}>
        <h2>Qui sommes-nous?</h2>
        <h3>Nos valeurs humaines et profissionnelles:</h3>
        <p>
          Externatic, c'est avant tout une équipe d'experts IT, tous animés par
          al même passion des relations humaines. L'intelligence émotionnelle et
          l'éducation cognitive en peuvent être remplacées par des algorithmes.
          Notre cabinet de recrutement s'appuie sur des méthodes authentiques,
          où l'humain est tout simplement indispensable. Depuis 12 ans,
          externatic a développé un savoir-faire sur le recrutement de profils
          pénuriques. Ces compétences nous permettent d'intervenir sur d'autres
          secteurs que l'IT. Notamment l'industrie avec Induseo et al
          cybersécurité avec Underguard.
        </p>
      </section>
      <h2>Top Annonces</h2>
      <TopAnnoncesCard />
    </main>
  );
}
