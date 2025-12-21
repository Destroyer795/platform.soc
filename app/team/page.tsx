'use client';
import Card from '@/app/components/TeamProfileCard';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../components/theme-context';

type TeamMember = {
  name: string;
  username: string;
  avatar: string;
  tags: string[];
  designation: string;
};

const TeamPage = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [_allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/team.json');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status ${response.status}`);
        }

        const data = await response.json();
        const teamData: TeamMember[] = data.team;
        setTeamMembers(teamData);

        // Generate unique tags from all resources
        const tags = teamData.flatMap((member: TeamMember) => member.tags);
        const uniqueTags = [...new Set(tags)].sort();
        setAllTags(uniqueTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load team');
        console.error('Error loading team:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeam();
  }, []);

  // Toggle a tag in the selectedLabels array
  // const toggleTag = (tag: string) => {
  //   setSelectedLabels((prev) =>
  //     prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
  //   );
  // };

  // Clear all selected tags
  // const clearFilters = () => {
  //   setSelectedLabels([]);
  // };

  // Filtering Logic (same as before)
  const filteredTeam =
    selectedLabels.length === 0
      ? teamMembers
      : teamMembers
          .map((resource) => {
            const matchingTagsCount = selectedLabels.filter((tag) =>
              resource.tags.includes(tag),
            ).length;
            return { resource, matchingTagsCount };
          })
          .filter(({ matchingTagsCount }) => matchingTagsCount > 0)
          .sort((a, b) => b.matchingTagsCount - a.matchingTagsCount)
          .map(({ resource }) => resource);
  const { theme, classes } = useTheme();
  const maintainers = filteredTeam.filter((member) =>
    member.tags.includes('Maintainer'),
  );
  const developers = filteredTeam.filter(
    (member) => !member.tags.includes('Maintainer'),
  );

  return (
    <div className="min-h-screen">
      {/* TODO: Filter Chips (enable after all maintainers are added) */}
      {/* <div className="relative mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2"> */}
      {/*   {allTags.map((tag) => { */}
      {/*     const isSelected = selectedLabels.includes(tag); */}
      {/*     return ( */}
      {/*       <button */}
      {/*         type="button" */}
      {/*         key={tag} */}
      {/*         onClick={() => toggleTag(tag)} */}
      {/*         className={`flex cursor-pointer items-center justify-center rounded-full px-3 py-1 font-medium text-sm shadow-sm transition-all duration-200 ${isSelected */}
      {/*           ? 'bg-slate-700 text-white hover:bg-slate-800' */}
      {/*           : 'border border-gray-300 bg-gray-50 text-gray-900 hover:bg-gray-100' */}
      {/*           }`} */}
      {/*       > */}
      {/*         {isSelected && <BsCheckLg className="mr-2 h-4 w-4" />} */}
      {/*         {tag} */}
      {/*       </button> */}
      {/*     ); */}
      {/*   })} */}
      {/*   {selectedLabels.length > 0 && ( */}
      {/*     <button */}
      {/*       type="button" */}
      {/*       onClick={clearFilters} */}
      {/*       className="ml-2 rounded-full bg-[#ffa4a4] px-2 py-1 font-medium text-[#360000] text-sm shadow-sm transition-all duration-200 hover:bg-[#ffa4a4]/80 flex items-center justify-center align-middle" */}
      {/*     > */}
      {/*       <FaTimes className="mr-1 h-4 w-4" /> */}
      {/*       Clear Filters */}
      {/*     </button> */}
      {/*   )} */}
      {/* </div> */}

      <section className="mx-auto max-w-(--breakpoint-xl) px-4 pb-10 pt-10 sm:px-6 md:px-8">
        {isLoading ? (
          <div className="flex min-h-[60vh] items-center justify-center gap-2">
            <Loader2 className="animate-spin w-5 h-5 text-white" />
            <p className="text-white">Fetching team...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredTeam.length === 0 ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-white">
              No team members matched your selected tag.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            <div className="text-center">
              <h2
                className={`font-extrabold text-4xl ${classes.pageTitle} drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] md:text-5xl`}
              >
                Maintainers
              </h2>
              <p
                className={`mx-auto mt-2 max-w-3xl text-lg ${classes.pageDesc} drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]`}
              >
                Guiding the project forward and ensuring contributions meet high
                standards.
              </p>
              <div className="grid grid-cols-1 justify-items-center gap-3 md:gap-6 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3 w-full ml-auto mr-auto mt-8">
                {maintainers.map((card, index: number) => (
                  <Card
                    key={`${card.name}-${index}`}
                    {...card}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2
                className={`font-extrabold text-4xl ${classes.pageTitle} drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] md:text-5xl`}
              >
                Developers
              </h2>
              <p
                className={`mx-auto mt-2 max-w-3xl text-lg ${classes.pageDesc} drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]`}
              >
                Meet the developers behind this website, bringing it to life
                through thoughtful engineering.
              </p>
              <div className="grid grid-cols-1 justify-items-center gap-3 md:gap-6 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3 w-full ml-auto mr-auto mt-8">
                {developers.map((card, index: number) => (
                  <Card
                    key={`${card.name}-${index}`}
                    {...card}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamPage;
