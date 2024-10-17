import './styles.scss';
import TaskList from "./TaskList";

export default function Todos() {
  return (
    <section className='Todos'>
      <h1>The Commonality To-Do Lists</h1>

      <div className='todo-section'>
        <h2>Game Management</h2>
        <TaskList
          title="Discord"
          tasks={[
            "Setup a new discord server",
            "Research best options for pbp channels",
            "Add server and channels to bot",
          ]}
          complete={[

          ]}></TaskList>
        <TaskList
          title="Other"
          tasks={[
            "Create a The Commonality Logo",
            "Create deck plans for ships",
            "Create floor plans for business",
            "Write The Commonality Sector Rules",
            "Generate Jobs and Missions",
            "Consider Initial Sessions",
            "List of things to test in app for Zack"
          ]}></TaskList>
        <TaskList
          title="Data"
          tasks={[
            "Make list of adventures in books",
            "Mark adventures as complete",
            "Mark planets visited",
            "Add species"
          ]}></TaskList>

      </div>

      <div className='todo-section'>
        <h2>Database Management</h2>
        <TaskList
          title='Database Design'
          tasks={[
            "Create a news model",
            "Seed database with basic data",
            "Remove Contacts data model",
            "Use SQL For database for gear, vehciles, etc.",
            "Convert spreadsheets/ csv to json for adding to database",
            "Create JSON Seed files for each of our data models",
            "Link current location fields to planets using firebase reference",
            "Link known associates to other characters using Firebase reference",
            "Link members to characters or characters to orgs with firebase reference",
            "Add FetchPCs method"
          ]}
          complete={[
            "Does contacts need to be different than characters",
            "Include isContact? and other contact information on relevant characters",
            "Contact should be a map field on Character",
            "Add Characters Data Model",
            "Add Planets Data Model",
            "Add Organizations Data Model",
            "Add Vehicles Data Model",
            "Add Species Data Model",
            "Add Contacts Data Model",
            "Add Users Data Model"
          ]}
          ></TaskList>
      </div>

      <div className='todo-section'>
        <h2>Programming Tasks</h2>
        <TaskList
          title='Site-Wide'
          tasks={[
            "Incorporate User Settings",
            "Refactor Styles",
            "Refactor Page Lists",
            "Remove/move Tasks from pages",
            "Alphabetical Lists can be refactors/ componentized",
            "Link Contacts with Characters through Character map field",
            "The Commonality About Us and Financials",
            "Complete movement of content from old directory structure"
          ]}
        ><TaskList
          title='Users'
          tasks={[
            "Set Current/ Active Character",
            "Set Current/ Active Ship",
            "Create Users page",
            "Create User Page",
            "Add Primary/ Current/ Active PC",
            "Add Primary/ Current/ Active Vehicle",
            "Redesign Settings Page"
          ]}
          complete={[
            "Create Settings Page",
            "Add Screen Border Settings",
            "Add Link Color Settings",
            "Add Link Hover Color Settings",
            "Add Primary Font Settings",
            "Add PC Ordering Setting"
          ]}
          ></TaskList>
        </TaskList>
        <TaskList 
          title='Home Page'
          tasks={[
            "Create a better design"
          ]}
          complete={[
            "Scrollable list of PCs",
            "PCs ordered by user preference"
          ]}
        />
        <TaskList
          title='Characters' 
          tasks={[
            "Add filter options [type, location]",
            "Create a Search Box",
            "New Character Page",
            "Edit Character Page",
            "Refactor strain, wounds to a neutral component for use with vehicles"
          ]}
          complete={[
            "Should Contacts be a separate page or a filter on characters?",
            "Add alphabetical separators to character list",
            "Remove Task List",
            "Scrollable list of PC Status Bars",
            "PCs sortable by user preference",
            "Aplphabetical list of all Chcaracters"
          ]}
          >
          <TaskList
            title="Character"
            tasks={[
              "Add triggered obligation, duty, morality",
              "Add Talents",
              "Add Force Powers",
              "Add Gear",
              "Add Faction Esteen",
              "Add Conflict",
              "Add Morality",
              "Add Duty",
              "Custom Page for Minions, Rivals, Nemeses, PCs"
            ]}
            complete={[
              "Add Force Rating",
              "Add Obligation",
              "Add Skills",
              "Add Wounds",
              "Add Strain",
              "Add Name",
              "Add Image",
              "Add Species",
              "Add urrent Location",
              "Add isContact?",
              "Add Type [pc, nemesis, rival, minion] (as skill level)",
              "Add Credits",
              "Add Known Associates"
            ]}
            ></TaskList>
            <TaskList
          title="Contacts"
          tasks={[
            "Alphabet separators",
            "Filter options [esteem, type, location]",
            "Search Feature",
            "New Contact Page (if not part of Character)",
            "Edit Contact Page (if not part of Character)",
            "Should contacts be a separate page of a filter on characters?"
          ]}
          complete={[
            "Remove Task List",
            "Alphabetical List of contacts"
          ]}
          >
          <TaskList
            title="Contact"
            tasks={[
              "Contact should be map field on Character",
              "Add Name",
              "Add Last Location",
              "Add Wounds",
              "Add Strain",
              "Add Esteem",
              "Add Biography",
              "Add Type",
              "Add Gear",
              "Add Other SWRPG Data"
            ]}></TaskList>
        </TaskList>
        </TaskList>
        <TaskList
          title='Organizations'
          tasks={[
            "Link organizations to characters",
            "Link organizations to users",
            "Create display of key organizations",
            "New Organization Page",
            "Edit Organization Page",
          ]}
          complete={[
            "Remove Task List",
            "Alphabetical List of Organizations"
          ]}
          >
            <TaskList
              title="Organization"
              tasks={[
                "Add Jobs",
                "Add Bonuses",
                "Add Rewards",
                "Add PC Esteem Table",
                "Organization Resources",
                "Organization Credits",
                "Add Styles"
              ]}
              complete={[
                "Create Page",
                "Add Name",
                "Add Logo",
                "Add Description",
                "Add Headquarters",
                "Add Known Members",
                
              ]}
              ></TaskList>
        </TaskList>
        <TaskList
          title='Planets'
          tasks={[
            "Add Favorite Planets List to Top",
            "OR Add Current Planet(s) List to Top",
            "Alphabetical Separators",
            "Filter options [region, sector, grid, visited, nearby]",
            "Search Feature",
            "The Commonality Section",
            "New Planet Page",
            "Edit Planet Page",
          ]}
          complete={[
            "Remove Task List",
            "Alphabetical List of planets"
          ]}
          >
            <TaskList
              title="Planet"
              tasks={[
                "Add Images",
                "Add Astrogation: Plot Course to",
                "Add Astrogation: Plot Course from",
                "Automatically detect astrogation to planet from currentl location",
                "Add Other SWRPG Data info",
                "Link visited to selected active character"
              ]}
              complete={[
                "Add Name",
                "Add Image",
                "Add Description",
                "Add Location Data [Region, Sector, Grid]",
                "Add visited?"
              ]}
              ></TaskList>
        </TaskList>
        <TaskList
          title="Species"
          tasks={[
            "Filter options [met, ratings, locations]",
            "Search Feature",
            "New Species Page",
            "Edit Species Page",
            "Add Styles"
          ]}
          complete={[
            "Remove Task List",
            "Alphabetical Separators",
            "Alphabetical List of Species"
          ]}
          >
          <TaskList
            title="Species [Singular]"
            tasks={[
              "Add Build Information From SWRPG [Brawn, Agility, etc.]",
              "Description from SWRPG Books"
            ]}
            complete={[
              "Add Home Planet (linked?)",
              "Create the Page",
              "Add Name",
              "Add Image",
              "Add Known Members (From Characters?)",
              
            ]}
            ></TaskList>
        </TaskList>
        <TaskList
          title="Vehicles"
          tasks={[
            "Scrollable List of PC owned vehicles with image, status bar",
            "Alpabet separators for list",
            "Filter options [class, enc, hyperdrive, speed]",
            "Search Feature",
            "New Vehicle Page",
            "Edit Vehicle Page",
            "Refactor character strain, wounds as neutral component for use with vehicles"
          ]}
          complete={[
            "How to handle owned vehicles vs. vehicle database",
            "Remove Task List",
            "Alphabetical List of Vehicles"
          ]}
          >
          <TaskList
            title="Vehicle"
            tasks={[
              "Add Styles",
              "Separate View for PC owned vehicles",
              "Add Weapons",
              "Add standard swrpg information",
            ]}
            complete={[
              "Add complement",
              "Add Passengers",
              "Add Hull Trauma",
              "Add System Strain",
              "Add Armor",
              "Add Silhouette",
              "Add Consumables",
              "Add Fuel",
              "Add Encumbrance",
              "Add Vehicle Make, Model",
              "Add Vehicle Name",
              "Add Type",
              "Add Hyperdrive"
            ]}
            ><TaskList
            title='PC/NPC Vehicles'
            tasks={[
              "Add Cargo",
              "Add Current Location",
              "Add current Status",
              "Create Vehicle Sheet",
              "Add Repair, refuel and reload costs"
              ]}></TaskList>
            </TaskList>
        </TaskList>
        
      </div>
    </section>
  )
}