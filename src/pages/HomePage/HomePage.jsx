import css from './HomePage.module.css';
import { Section, Container, Btn } from 'components/UI';
import Recipes from 'components/Recipes/Recipes';
import Hero from 'components/Hero/Hero';
import PageTitle from 'components/PageTitle/PageTitle';
import CategoriesList from 'components/CategoriesList/CategoriesList';
import Testimonials from 'components/Testimonials/Testimonials';

import { fetchCategories, fetchRecipes } from 'store/recipes/operations';

import { selectLoading, selectError, selectRecipes, selectCategories } from 'store/recipes/selectors';
import { selectTestimonials } from 'store/testimonials/selectors';
import { fetchTestimonials } from 'store/testimonials/operations';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useScrollToElement from '../../hooks/useScrollToElement';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollToElement = useScrollToElement();
  const isLoading = useSelector(selectLoading);
  const hasError = useSelector(selectError);

  const testimonials = useSelector(selectTestimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const heroProps = {
    title: 'Improve Your Culinary Talents',
    subtitle: 'Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.',
  };

  return (
    <>
      <Hero {...heroProps}>
        <Btn variant="outlined" className={css.heroBtn} onClick={() => navigate('/catalog')}>
          Add recipe
        </Btn>
      </Hero>
      <Section id="homepage-categories" className={css.section}>
        <Container>
          <Outlet />
        </Container>
      </Section>

      <Section style={{ marginBottom: 80 }}>
        <Container>
          <Testimonials testimonials={testimonials} />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
