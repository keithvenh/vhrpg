import './styles.scss';
import TaskList from "./TaskList";

export default function Todos() {
  return (
    <section className='Todos'>
      <h1>Vorzyd Industries To-Do Lists</h1>

      <div className='todo-section'>
        <h2>Game Management</h2>

      </div>

      <div className='todo-section'>
        <h2>Database Management</h2>
        <TaskList
          title='Database Design'
          tasks={[
            "Does contacts need to be different than characters",
            "Include isContact? and other contact information on relevant characters",
            "Contact should be a map field on Character",
            "Create a news model"
          ]}></TaskList>
      </div>

      <div className='todo-section'>
        <h2>Programming Tasks</h2>
        <TaskList 
          title='Site-Wide'
          tasks={[
            "Incorporate User Settings",
            "Refactor Styles",
            "Refactor Page Lists",
            "Remove/move Tasks from pages"
          ]}
        />
        <TaskList 
          title='Home Page'
          tasks={[
            "Create a better design"
          ]}
        />
        <TaskList
          title='Characters' 
          tasks={[
            "Add alphabetical separators to character list",
            "Add filter options [type, location]",
            "Create a Search Box",
            "New Character Page",
            "Edit Character Page"
          ]}>
          <TaskList
            title="Character"
            tasks={[
              "Add Credits",
              "Add triggered obligation, duty, morality",
              "Add Force Rating",
              "Add Obligation",
              "Add Skills",
              "Add Talents",
              "Add Force Powers",
              "Add Gear",
              "Add Faction Esteen",
              "Add Conflict",
              "Add Morality",
              "Add Duty",

            ]}></TaskList>

        </TaskList>
        <TaskList
          title='Organizations'
          tasks={[
            "Link organizations to characters",
            "Link organizations to users",
            "Create display of key organizations",
            "New Organization Page",
            "Edit Organization Page",
          ]}>
            <TaskList
              title="Organization"
              tasks={[
                "Create Page",
                "Add Name",
                "Add Logo",
                "Add Description",
                "Add Jobs",
                "Add Bonuses",
                "Add Rewards",
                "Add Headquarters",
                "Add Known Members",
                "Add PC Esteem Table",
                "Organization Resources",
                "Organization Credits"
              ]}></TaskList>
        </TaskList>
        <TaskList
          title='Planets'
          tasks={[
            "Add Favorite Planets List to Top",
            "OR Add Current Planet(s) List to Top",
            "Alphabetical Separators",
            "Filter options [region, sector, grid, visited, nearby]",
            "Search Feature",
            "Vorzyd Sector Section",
            "New Planet Page",
            "Edit Planet Page"
          ]}>
            <TaskList
              title="Planet"
              tasks={[
                "Add Images",
                "Add Astrogation: Plot Course to",
                "Add Astrogation: Plot Course from",
                "Automatically detect astrogation to planet from currentl location",
                "Add Other SWRPG Data info"
              ]}></TaskList>
        </TaskList>
        <TaskList
          title="Species"
          tasks={[
            "Alphabetical Separators",
            "Filter options [met, ratings, locations]",
            "Search Feature",
            "New Species Page",
            "Edit Species Page"
          ]}>
          <TaskList
            title="Species [Singular]"
            tasks={[
              "Create the Page",
              "Add Name",
              "Add Image",
              "Add Known Members (From Characters?)",
              "Add Home Planet (linked?)",
              "Add Build Information From SWRPG [Brawn, Agility, etc.]",
              "Encounterd? (boolean)",
              "Description from SWRPG Books"
            ]}></TaskList>
        </TaskList>
        <TaskList
          title="Vehicles"
          tasks={[
            "Scrollable List of PC owned vehicles with image, status bar",
            "Alpabet separators for list",
            "Filter options [class, enc, hyperdrive, speed]",
            "Search Feature",
            "New Vehicle Page",
            "Edit Vehicle Page"
          ]}>
          <TaskList
            title="Vehicle"
            tasks={[
              "Add Vehicle Make, Model",
              "Add Vehicle Name",
              "Add Hull Trauma",
              "Add System Strain",
              "Add Armor",
              "Add Type",
              "Add Current Location",
              "Add Shilhouette",
              "Add Consumables",
              "Add Fuel",
              "Add Encumbrance",
              "Add Weapons",
              "Add Cargo",
              "Add standard swrpf information",
              "Add Repair, refuel and reload costs"
            ]}></TaskList>
        </TaskList>
        <TaskList
          title="Contacts"
          tasks={[
            "Alphabet separators",
            "Filter options [esteem, type, location]",
            "Search Feature",
            "New Contact Page (if not part of Character)",
            "Edit Contact Page (if not part of Character)"
          ]}>
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
        
      </div>
    </section>
  )
}