import { Activity, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
    buildContributionWeeks,
    formatContributionLabel,
    getLastYearTotal,
} from "../lib/githubContributions";

import "./GitHubContributions.css";

const GITHUB_USERNAME = "icecold009";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function isContributionResponse(payload) {
    return payload && Array.isArray(payload.contributions);
}

function ContributionCell({ day, interactive, onSelect }) {
    const label = formatContributionLabel(day);

    if (!interactive) {
        return <span className="github-contribution-cell" data-level="0" aria-hidden="true" />;
    }

    return (
        <button
            className="github-contribution-cell"
            data-level={day.level}
            data-tooltip={label}
            type="button"
            role="gridcell"
            aria-label={label}
            title={label}
            onClick={() => onSelect(day)}
        />
    );
}

export default function GitHubContributions() {
    const [status, setStatus] = useState("loading");
    const [payload, setPayload] = useState(null);
    const [selectedContribution, setSelectedContribution] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        let didUnmount = false;
        const timeoutId = window.setTimeout(() => controller.abort(), 8000);

        fetch(CONTRIBUTIONS_URL, {
            headers: { Accept: "application/json" },
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Contribution request failed with ${response.status}`);
                }

                return response.json();
            })
            .then((nextPayload) => {
                if (!isContributionResponse(nextPayload)) {
                    throw new Error("Contribution response was not a calendar");
                }

                setPayload(nextPayload);
                setStatus("ready");
            })
            .catch((error) => {
                if (error.name !== "AbortError" || !didUnmount) {
                    setStatus("error");
                }
            })
            .finally(() => {
                window.clearTimeout(timeoutId);
            });

        return () => {
            didUnmount = true;
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, []);

    const weeks = useMemo(
        () => buildContributionWeeks(payload?.contributions ?? []),
        [payload],
    );
    const total = payload ? getLastYearTotal(payload) : null;
    const isReady = status === "ready";

    return (
        <section className="home-section home-section--activity" aria-labelledby="home-activity-title">
            <div className="home-section__heading github-contributions__heading">
                <div>
                    <p className="home-kicker">Activity</p>
                    <h2 id="home-activity-title">GitHub Contributions</h2>
                </div>
                <p className="github-contributions__metric" aria-live="polite">
                    <Activity size={18} aria-hidden="true" />
                    {status === "loading" && <span>Loading public activity</span>}
                    {status === "error" && <span>Live activity unavailable</span>}
                    {isReady && <><strong>{new Intl.NumberFormat("en-US").format(total)}</strong> contributions in the last year</>}
                </p>
            </div>

            <div className="github-contributions__panel">
                <div className="github-contributions__viewport">
                    <div
                        className="github-contributions__calendar"
                        data-state={status}
                        aria-busy={!isReady}
                        style={{ "--week-count": weeks.length }}
                    >
                        <div className="github-contributions__month-row" aria-hidden="true">
                            {weeks.map((week, index) => <span key={`${week.monthLabel}-${index}`}>{week.monthLabel}</span>)}
                        </div>
                        <div className="github-contributions__calendar-body">
                            <div className="github-contributions__weekday-labels" aria-hidden="true">
                                {WEEKDAY_LABELS.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}
                            </div>
                            <div className="github-contributions__grid" role="grid" aria-label="GitHub contribution activity for the last year">
                                {weeks.map((week, weekIndex) => (
                                    <div className="github-contributions__week" key={`week-${weekIndex}`} role="row">
                                        {week.days.map((day) => (
                                            <ContributionCell
                                                day={day}
                                                interactive={isReady}
                                                key={day.date}
                                                onSelect={setSelectedContribution}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="github-contributions__footer">
                    {selectedContribution && isReady && (
                        <p className="github-contributions__selected" aria-live="polite">
                            {formatContributionLabel(selectedContribution)}
                        </p>
                    )}
                    <div className="github-contributions__legend" aria-label="Contribution intensity legend">
                        <span>Less</span>
                        {[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} aria-hidden="true" />)}
                        <span>More</span>
                    </div>
                </div>

                {status === "error" && (
                    <p className="github-contributions__fallback" role="status">
                        Could not load the live calendar right now. <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">View GitHub profile <ArrowUpRight size={14} aria-hidden="true" /></a>
                    </p>
                )}
            </div>
        </section>
    );
}
