import React from "react";
import styled from "styled-components";
import {Download, FileText, Lock, ShieldAlert, ShieldCheck, UserCog, UserPlus, Users, Zap, type LucideIcon} from "lucide-react";
import {siGithub} from "simple-icons";
import {ICON, REPOSITORY, RELEASES} from "../constants";
import {useCopy} from "../language";

const Hero = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 0 8px;
    text-align: center;
`;

const AppIcon = styled.img`
    width: 88px;
    height: 88px;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 2.6rem;
    letter-spacing: -0.03em;
`;

const Tagline = styled.p`
    margin: 0;
    max-width: 560px;
    color: #9ca3af;
    font-size: 1.05rem;
`;

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 12px;
`;

const Button = styled.a<{ $primary?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 9px;
    border: 1px solid ${(props) => (props.$primary ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.12)")};
    background: ${(props) => (props.$primary ? "rgba(59, 130, 246, 0.2)" : "transparent")};
    color: ${(props) => (props.$primary ? "#bfdbfe" : "#d1d5db")};
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s ease, border-color 0.15s ease;

    &:hover {
        background: ${(props) => (props.$primary ? "rgba(59, 130, 246, 0.32)" : "rgba(255, 255, 255, 0.06)")};
        border-color: rgba(255, 255, 255, 0.25);
    }
`;

const Section = styled.section`
    margin-top: 56px;
`;

const Heading = styled.h2`
    margin: 0 0 16px;
    font-size: 1.3rem;
    letter-spacing: -0.01em;
`;

const Lead = styled.p`
    margin: 0 0 18px;
    max-width: 760px;
    color: #9ca3af;
    font-size: 0.92rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 14px;
`;

const Feature = styled.article`
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.6);
`;

const FeatureIcon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.14);
    color: #93c5fd;
`;

const FeatureName = styled.h3`
    margin: 0 0 6px;
    font-size: 0.92rem;
`;

const FeatureText = styled.p`
    margin: 0;
    color: #9ca3af;
    font-size: 0.84rem;
`;

const Steps = styled.ol`
    display: grid;
    gap: 12px;
    max-width: 760px;
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: step;
`;

const Step = styled.li`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 14px 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.6);
    color: #d1d5db;
    font-size: 0.88rem;
    counter-increment: step;

    &::before {
        content: counter(step);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.18);
        color: #93c5fd;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 700;
    }
`;

const InstallCard = styled.a`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 320px;
    padding: 16px 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.6);
    text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
        border-color: rgba(99, 102, 241, 0.45);
        background: rgba(30, 41, 59, 0.7);
    }
`;

const PlatformName = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f9fafb;
    font-size: 0.95rem;
    font-weight: 600;
`;

const BrandIcon = styled.svg`
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    fill: #93c5fd;
`;

const PlatformNote = styled.span`
    color: #9ca3af;
    font-size: 0.8rem;
`;

const Note = styled.p`
    margin: 16px 0 0;
    max-width: 760px;
    color: #6b7280;
    font-size: 0.8rem;
`;

const featureIcons: LucideIcon[] = [Users, ShieldAlert, ShieldCheck, Zap, UserCog, UserPlus, FileText, Lock];

/** simple-icons dropped the Windows mark, so the four squares are drawn here. */
const windowsLogo = {path: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"};

export const HomePage: React.FC = () => {
    const home = useCopy().home;

    return (
        <>
            <Hero>
                <AppIcon src={ICON} alt=""/>
                <Title>AntiBot</Title>
                <Tagline>{home.tagline}</Tagline>
                <Actions>
                    <Button $primary href={RELEASES}>
                        <Download size={17}/>
                        {home.download}
                    </Button>
                    <Button href={REPOSITORY}>
                        <BrandIcon viewBox="0 0 24 24" aria-hidden="true">
                            <path d={siGithub.path}/>
                        </BrandIcon>
                        GitHub
                    </Button>
                </Actions>
            </Hero>

            <Section>
                <Heading>{home.whatTitle}</Heading>
                <Lead>{home.whatText}</Lead>
            </Section>

            <Section>
                <Heading>{home.featuresTitle}</Heading>
                <Grid>
                    {home.features.map(({name, text}, index) => {
                        const Glyph = featureIcons[index] ?? ShieldCheck;

                        return (
                            <Feature key={name}>
                                <FeatureIcon>
                                    <Glyph size={18}/>
                                </FeatureIcon>
                                <FeatureName>{name}</FeatureName>
                                <FeatureText>{text}</FeatureText>
                            </Feature>
                        );
                    })}
                </Grid>
            </Section>

            <Section>
                <Heading>{home.howTitle}</Heading>
                <Steps>
                    {home.how.map((step) => <Step key={step}>{step}</Step>)}
                </Steps>
            </Section>

            <Section>
                <Heading>{home.installTitle}</Heading>
                <Lead>
                    {home.installBefore}
                    <a href={REPOSITORY}>{home.readme}</a>
                    {home.installAfter}
                </Lead>
                <InstallCard href={RELEASES}>
                    <PlatformName>
                        <BrandIcon viewBox="0 0 24 24" aria-hidden="true">
                            <path d={windowsLogo.path}/>
                        </BrandIcon>
                        {home.platform.name}
                    </PlatformName>
                    <PlatformNote>{home.platform.note}</PlatformNote>
                </InstallCard>
                <Note>{home.oscNote}</Note>
            </Section>
        </>
    );
};
